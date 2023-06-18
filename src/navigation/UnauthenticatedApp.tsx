import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text } from '@ui-kitten/components';
import { config } from "../config/config";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import {RegisterScreen} from "../screens/RegisterScreen/RegisterScreen";

const Stack = createStackNavigator();

const UnauthenticatedApp = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text category="h4" style={{ alignSelf: 'center', marginVertical: 16 }}>
                {config.APP_NAME}
            </Text>
            <Divider />

            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen}/>
            </Stack.Navigator>
        </SafeAreaView>
    );
};

export default UnauthenticatedApp;
