import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import {RegisterScreen} from "../screens/RegisterScreen/RegisterScreen";
import {UnauthenticatedAppScreen} from "../screens/UnauthenticatedAppScreen/UnauthenticatedAppScreen";
import {ActivationScreen} from "../screens/ActivationScreen/ActivationScreen";

const Stack = createStackNavigator();

const UnauthenticatedApp = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="App" component={UnauthenticatedAppScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='Activation' component={ActivationScreen}/>
        </Stack.Navigator>
    );
};

export default UnauthenticatedApp;
