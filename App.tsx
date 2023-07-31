import React, {useCallback, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {ApplicationProvider} from "@ui-kitten/components";
import UnauthenticatedApp from "./src/navigation/UnauthenticatedApp";
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider, useAuth} from "./src/hooks/useAuth";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import * as eva from '@eva-design/eva';
import * as Font from 'expo-font';
import AuthenticatedApp from "./src/navigation/AuthenticatedApp";
import {StatusBar} from "expo-status-bar";
import {Loader} from "./src/components/Loader/Loader";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [fontsLoaded] = useFonts({
        'RobotoLight': require('./assets/fonts/Roboto-Light.ttf'),
        'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf'),
        'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
        'AsapLight': require('./assets/fonts/Asap-Light.ttf'),
        'AsapRegular': require('./assets/fonts/Asap-Regular.ttf'),
        'AsapMedium': require('./assets/fonts/Asap-Medium.ttf'),
        'AsapBold': require('./assets/fonts/Asap-Bold.ttf'),
        'BebasNeu': require('./assets/fonts/BebasNeue-Regular.ttf'),
    })

    useEffect(() => {
        // Ukryj ekran startowy po załadowaniu czcionek
        if (fontsLoaded) {
            SplashScreen.hideAsync();
            setFontLoaded(true);
        }
    }, [fontsLoaded]);

    if (!fontLoaded) {
        return null; // Zwróć null, aby nic nie wyświetlać w trakcie ładowania czcionek
    }


    return (
        <SafeAreaProvider>
            <StatusBar style="auto"/>
            <ApplicationProvider {...eva} theme={{...eva.light}}>
                <NavigationContainer>
                    <AuthProvider>
                        <AppContent/>
                    </AuthProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </SafeAreaProvider>
    );
};

function AppContent() {

    const {user} = useAuth();

    return (
        <>
            {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        </>
    );
}

export default App;


