import {BackHandler, ToastAndroid} from "react-native";
import {createContext, useContext, useEffect, useState} from "react";
import {config} from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {setIfErrMsg} from "../helpers/setIfErrMsg";
import {Login, TokenResponse, UserRes, WpLogin} from "../interfaces/auth.interfaces";
import {LoginNavigationProp} from "../interfaces/navigation.interfaces";
import {StorageManager} from "../helpers/asyncStorage";
import axios from "axios";


interface AuthContextType {
    user: UserRes | null;
    setUser: React.Dispatch<React.SetStateAction<UserRes | null>>;
    signIn: (data: Login) => Promise<any>;
    wpLogin: (data: WpLogin) => Promise<any>;
    wpToken: string | null;
    setWpToken: React.Dispatch<React.SetStateAction<string | null>>; // Dodajemy nową funkcję
    signOut: () => void;
    checkWpToken: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserRes | null>(null);
    const [wpToken, setWpToken] = useState<string | null>(null);
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


    const checkWpToken = async () => {
        try {
            // Sprawdź, czy wpToken istnieje
            const storedWpToken = await AsyncStorage.getItem("wpToken");
            if (!storedWpToken) {
                ToastAndroid.show(
                    "Brak autoryzacji WordPress - pobierz token ponownie.",
                    ToastAndroid.SHORT
                )
                return;
            }

            // Zweryfikuj wpToken na backendzie lub zewnętrznym API
            // Załóżmy, że istnieje endpoint API do walidacji
            const tokenValidationRes = await fetch(
                `${config.API_URL}/api/auth/wp-login/token`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            );

            const tokenValidationData = await tokenValidationRes.json();

            if (!tokenValidationData.isSuccess) {
                ToastAndroid.show(
                    "Token jest nieprawidłowy. Zaloguj się ponownie.",
                    ToastAndroid.SHORT
                )
                await AsyncStorage.removeItem('wpToken'); // Usuń nieprawidłowy token
                setWpToken(null);
                return;
            }

            // Jeśli token jest poprawny, ustaw go w stanie
            setWpToken(storedWpToken);

            // ... reszta kodu
        } catch (error) {
            // Obsłuż inne błędy
            // ...
            ToastAndroid.show(
                "Catch error",
                ToastAndroid.SHORT
            )
        }
    };

    // useEffect(() => {
    //     const getWpToken = async () => {
    //         const token = await AsyncStorage.getItem("wpToken");
    //         setWpToken(token);
    //     };
    //
    //     getWpToken();
    // }, []);
    // !@!@!@!!@!@!@!@!@!@!!@!@!@!@!@!@!!@!@!@TEN KOD RACZEJ NIE DZIALA I POWODUJE BLEDY, SPRAWDZIC JAK BYLO TO ZROBIONE W WERSJI WEBOWEJ!@!@!@!!@!@!@
    // useEffect(() => {
    //     const saveWpToken = async () => {
    //         if (wpToken) {
    //             await AsyncStorage.setItem("wpToken", wpToken);
    //         }
    //     };
    //
    //     saveWpToken();
    // }, [wpToken]);

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

                    // // Odczytaj token z localStorage i ustaw go
                    // const storedWpToken = await AsyncStorage.getItem("wpToken");
                    // if (storedWpToken) {
                    //     setWpToken(storedWpToken);
                    // }

                    // await checkWpToken();
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

            if (!userData.isActive) {
                // @ts-ignore
                navigation.navigate('Activation', { email: userData.email });
                return;
            }

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

    const wpLogin = async (data: WpLogin) => {
        console.log("przed TRY");
        try {
            console.log("w TRY");
            const loginRes = await fetch(
                `${config.API_URL}/auth/wp-login`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!loginRes.ok) {
                console.error("Nieudane żądanie:", loginRes.status, loginRes.statusText);
                return null;
            }

            const tokenData = await loginRes.json();

            console.log("w srodku");
            // Zaktualizuj token w localStorage
            await StorageManager.saveObject('wpToken', tokenData.token);
            console.log('w srodku 2 token', tokenData.token)
            setWpToken(tokenData.token);

            // ... reszta kodu
        } catch (error) {
            console.error("Błąd w catch:", error);
            // Obsłuż inne błędy
            // ...
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{user, setUser, signIn, signOut, wpLogin, wpToken, setWpToken, checkWpToken}}>
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