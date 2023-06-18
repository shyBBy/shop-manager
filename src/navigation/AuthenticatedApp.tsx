import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import {BottomTabBar} from "../components/BottomTabBar/BottomTabBar";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import OrdersScreen from "../screens/OrdersScreen/OrdersScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const Tab = createBottomTabNavigator();

const AuthenticatedApp = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <IconRegistry icons={EvaIconsPack}/>

            <Tab.Navigator
                tabBar={props => <BottomTabBar {...props} />}
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                        let iconName;

                        if (route.name === 'Główna') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Zamówienia') {
                            iconName = 'shopping-bag-outline';
                        } else if (route.name === 'Ustawienia') {
                            iconName = 'settings-outline';
                        } else if (route.name === 'Sklep') {
                            iconName = 'shopping-cart-outline';
                        }

                        return <Icon name={iconName} width={size} height={size} fill={color}/>;
                    },
                })}
            >
                <Tab.Screen name="Główna" component={HomeScreen}/>
                <Tab.Screen name="Zamówienia" component={OrdersScreen}/>
                <Tab.Screen name="Ustawienia" component={SettingsScreen}/>
                <Tab.Screen name="Sklep" component={ShopScreen}/>
            </Tab.Navigator>

        </ApplicationProvider>
    );
};

export default AuthenticatedApp;
