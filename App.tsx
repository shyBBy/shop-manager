import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {theme} from './src/theme';
import {AuthProvider, useAuth} from './src/hooks/useAuth';
import UnauthenticatedApp from "./src/navigation/UnauthenticatedApp";
import AuthenticatedApp from "./src/navigation/AuthenticatedApp";


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
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <AuthProvider>
                        <AppContent/>
                    </AuthProvider>
                </NavigationContainer>
            </PaperProvider>
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


