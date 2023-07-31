import React, { useState } from 'react';

import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//NAVIGATION
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "react-native-screens/native-stack";


//SCREENS
import RefundScreen from '../screens/RefundScreen/RefundScreen';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import ShippingScreen from '../screens/ShippingScreen/ShippingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { SingleOrderProfileScreen } from '../screens/OrdersScreen/SingleOrderProfileScreen/SingleOrderProfileScreen';
import { SingleRefundProfileScreen } from '../screens/RefundScreen/SingleRefundProfileScreen/SingleRefundProfileScreen';


//ICONS
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const OrdersStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="SingleOrderProfile" component={SingleOrderProfileScreen} />
    </Stack.Navigator>
);

const RefundsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Refunds" component={RefundScreen} />
        <Stack.Screen name="SingleRefundProfile" component={SingleRefundProfileScreen} />
    </Stack.Navigator>
);

const AuthenticatedApp = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => {
                    let iconName;

                    if (route.name === 'Główna') {
                        iconName = focused ? 'home-sharp' : 'home-outline'
                    } else if (route.name === 'Zamówienia') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Przesyłki') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else {
                        iconName = focused ? 'home' : 'home-outline'
                    }

                    // @ts-ignore
                    return <Ionicons name={iconName} size={24} color="black" />
                }
            })}>
                <Tab.Screen name="Główna"  component={HomeScreen}/>
                <Tab.Screen name="Zamówienia" component={OrdersStack}/>
                <Tab.Screen name="Przesyłki" component={ShippingScreen}/>
                <Tab.Screen name="Zwroty" component={RefundsStack}/>
            </Tab.Navigator>

            // <Tab.Screen name="Główna" options={{ headerShown: false }} component={HomeScreen} />
            // <Tab.Screen options={{ headerShown: false }} name="Zamówienia" component={OrdersStack} />
            // <Tab.Screen name="Przesyłki" component={ShippingScreen} />
            // <Tab.Screen name="Zwroty" component={RefundsStack} options={{headerShown: false }} />

    );
};

export default AuthenticatedApp;
