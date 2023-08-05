import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { config } from "../config/config";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import {RegisterScreen} from "../screens/RegisterScreen/RegisterScreen";
import {Text} from "react-native-paper";

const Stack = createStackNavigator();

const UnauthenticatedApp = () => {
    return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen}/>
            </Stack.Navigator>
    );
};

export default UnauthenticatedApp;
