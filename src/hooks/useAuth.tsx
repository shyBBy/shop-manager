import {BackHandler, ToastAndroid} from "react-native";
import {createContext, useContext, useEffect, useState} from "react";
import {config} from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {setIfErrMsg} from "../helpers/setIfErrMsg";
import {Login, UserRes} from "../interfaces/auth.interfaces";
import {LoginNavigationProp} from "../interfaces/navigation.interfaces";
import {StorageManager} from "../helpers/asyncStorage";


interface AuthContextType {
    user: UserRes | null;
    setUser: React.Dispatch<React.SetStateAction<UserRes | null>>;
    signIn: (data: Login) => Promise<any>;
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
                    routes: [{name: "App"}],
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
        (async () => {
            try {
                const res = await fetch(
                    `${config.API_URL}/user`,
                    {
                        credentials: 'include',
                    },
                );
                const errMsg = await setIfErrMsg(res);
                if (!errMsg) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (err) {

            }
        })();
    }, []);

    const signIn = async (data: Login) => {
        try {
            const res = await fetch(`${config.API_URL}/auth/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json()
                ToastAndroid.show(
                    `${errorData.message}`,
                    ToastAndroid.LONG
                );
                setUser(null);
                return
            }

            const userData = (await res.json()) as UserRes;
            await StorageManager.saveObject('store', userData.store)
            setUser(userData);
            ToastAndroid.show(
                `Pomyślnie zalogowano, witaj ${userData.email}`,
                ToastAndroid.LONG
            );

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