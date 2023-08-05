import React, {useState} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from "react-native-paper";

//NAVIGATION
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import RefundScreen from '../screens/RefundScreen/RefundScreen';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import ShippingScreen from '../screens/ShippingScreen/ShippingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {SingleOrderProfileScreen} from '../screens/OrdersScreen/SingleOrderProfileScreen/SingleOrderProfileScreen';
import {SingleRefundProfileScreen} from '../screens/RefundScreen/SingleRefundProfileScreen/SingleRefundProfileScreen';


//ICONS
import {Ionicons} from '@expo/vector-icons';
import {theme} from "../theme";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const OrdersStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Orders" component={OrdersScreen}/>
        <Stack.Screen name="SingleOrderProfile" component={SingleOrderProfileScreen}/>
    </Stack.Navigator>
);

const RefundsStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Refunds" component={RefundScreen}/>
        <Stack.Screen name="SingleRefundProfile" component={SingleRefundProfileScreen}/>
    </Stack.Navigator>
);

const AuthenticatedApp = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            {/*<Appbar.Header>*/}
            {/*    <Appbar.Content title={''}/>*/}
            {/*    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />*/}
            {/*</Appbar.Header>*/}
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown: false,
                tabBarInactiveTintColor: theme.colors.onSurface,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarIcon: ({color, size, focused}) => {
                    let iconName;

                    if (route.name === 'Główna') {
                        iconName = focused ? 'home-sharp' : 'home-outline'
                    } else if (route.name === 'Zamówienia') {
                        iconName = focused ? 'cart-sharp' : 'cart-outline'
                    } else if (route.name === 'Zwroty') {
                        iconName = focused ? 'refresh-sharp' : 'refresh-outline'
                    } else {
                        iconName = focused ? 'settings-sharp' : 'settings-outline'
                    }

                    // @ts-ignore
                    return <Ionicons name={iconName} size={24} color={focused ? theme.colors.primary : theme.colors.onSurface} />;
                },
                tabBarLabel: ({ color }) => {
                    let label;
                    if (route.name === 'Główna') {
                        label = 'Główna';
                    } else if (route.name === 'Zamówienia') {
                        label = 'Zamówienia';
                    } else if (route.name === 'Zwroty') {
                        label = 'Zwroty';
                    } else {
                        label = 'Ustawienia';
                    }

                    // Zwracamy komponent Text zawierający tekst zakładki oraz odpowiednie style
                    return (
                        <Text variant="bodyMedium" style={{ color, fontSize: 13, fontFamily: "OswaldLight" , marginBottom: 5 }}>
                            {label}
                        </Text>
                    );
                }
            })}>
                <Tab.Screen name="Główna" component={HomeScreen}/>
                <Tab.Screen name="Zamówienia" component={OrdersStack}/>
                <Tab.Screen name="Zwroty" component={RefundsStack}/>
                <Tab.Screen name="Ustawienia" component={RefundsStack}/>
            </Tab.Navigator>
        </>

    );
};

export default AuthenticatedApp;


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: theme.colors.navigationBackground,
        borderTopWidth: 0,
        height: 72,
    },
});