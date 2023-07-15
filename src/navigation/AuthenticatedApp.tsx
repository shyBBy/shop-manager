import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import {BottomTabBar} from "../components/BottomTabBar/BottomTabBar";
import Warehouse from "../screens/WarehouseScreen/Warehouse";
import OrdersScreen from "../screens/OrdersScreen/OrdersScreen";
import ShippingScreen from "../screens/ShippingScreen/ShippingScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {SingleOrderProfileScreen} from "../screens/OrdersScreen/SingleOrderProfileScreen/SingleOrderProfileScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OrdersStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="SingleOrderProfile" component={SingleOrderProfileScreen} />
    </Stack.Navigator>
);

const AuthenticatedApp = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />

            <Tab.Navigator
                tabBar={props => <BottomTabBar {...props} />}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Główna') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Zamówienia') {
                            iconName = 'shopping-bag-outline';
                        } else if (route.name === 'Przesyłki') {
                            iconName = 'settings-outline';
                        } else if (route.name === 'Magazyn') {
                            iconName = 'shopping-cart-outline';
                        }

                        return <Icon name={iconName} width={size} height={size} fill={color} />;
                    },
                })}
            >
                <Tab.Screen name="Główna" options={{ title: 'Mój sklep' }} component={HomeScreen} />
                <Tab.Screen options={{headerShown: false}} name="Zamówienia" component={OrdersStack} />
                <Tab.Screen name="Przesyłki" component={ShippingScreen} />
                <Tab.Screen name="Magazyn" component={Warehouse} />
            </Tab.Navigator>
        </ApplicationProvider>
    );
};

export default AuthenticatedApp;
