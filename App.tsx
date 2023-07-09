import React from 'react';
import 'react-native-gesture-handler';
import {ApplicationProvider} from "@ui-kitten/components";
import UnauthenticatedApp from "./src/navigation/UnauthenticatedApp";
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider, useAuth} from "./src/hooks/useAuth";
import {SafeAreaProvider} from "react-native-safe-area-context";
import * as eva from '@eva-design/eva';
import AuthenticatedApp from "./src/navigation/AuthenticatedApp";
import {StatusBar} from "expo-status-bar";


const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto"/>
            <ApplicationProvider {...eva} theme={eva.light}>
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


