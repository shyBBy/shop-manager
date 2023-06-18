import {Login, UserRes} from "../interfaces/auth.interfaces";
import {BackHandler, ToastAndroid} from "react-native";
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {config} from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    // Dodaj inne ekrany, jeśli są wymagane
};

export type LoginNavigationProp = StackNavigationProp<RootStackParamList,
    "Login">;


interface AuthContextType {
    user: UserRes | null;
    setUser: React.Dispatch<React.SetStateAction<UserRes | null>>;
    signIn: (data: Login) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserRes | null>(null);
    const navigation = useNavigation<LoginNavigationProp>();

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    const signOut = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt");

            const response = await fetch(`${config.API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });

            if (response.ok) {
                setUser(null);
                await AsyncStorage.removeItem("jwt");
                ToastAndroid.show("Pomyślnie wylogowano.", ToastAndroid.SHORT);
                BackHandler.removeEventListener("hardwareBackPress", handleBackButton); // Usuwanie nasłuchiwania na wciśnięcie przycisku powrotu
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            } else {
                const errorData = await response.json();
                ToastAndroid.show(`${errorData.message}`, ToastAndroid.SHORT);
                setUser(null);
            }
        } catch (error) {
            ToastAndroid.show(
                "Coś poszło nie tak, spróbuj ponownie.",
                ToastAndroid.SHORT
            );
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch(`${config.API_URL}/user`, {
                    credentials: "include",
                });

                if (res.ok) {
                    const userData = await res.json() as UserRes;
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        };

        checkLoginStatus();
    }, []);

    const signIn = async (data: Login) => {
        try {
            const response = await fetch(`${config.API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (response.ok) {
                const responseData = await response.json();
                const userData = {
                    token: responseData.data.token,
                    email: responseData.data.email,
                    uuid: responseData.data.uuid,
                };

                setUser(responseData);

                ToastAndroid.show(
                    `Pomyślnie zalogowano, witaj ${userData.email}`,
                    ToastAndroid.LONG
                );

                await AsyncStorage.setItem("jwt", userData.token);

                axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
            } else {
                const errorData = await response.json();
                ToastAndroid.show(`${errorData.message}`, ToastAndroid.SHORT);
                setUser(null);
            }
        } catch (error) {
            ToastAndroid.show(
                "Coś poszło nie tak, spróbuj raz jeszcze.",
                ToastAndroid.LONG
            );
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, setUser, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("useAuth needs to be used inside AuthContext");
    }
    return auth;
};