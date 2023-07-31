import React from 'react';
import {BottomNavigation, BottomNavigationTab, withStyles} from '@ui-kitten/components';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {Theme} from "../../theme";


const ThemedBottomNavigationTab = withStyles(
    BottomNavigationTab,
    (theme) => ({
        title: {
            fontSize: 12,
            color: Theme.text.colors.accent,
            // Dodaj inne style według potrzeb
        },
    })
);


export const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
    const onSelect = (index: number) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <BottomNavigation selectedIndex={state.index} onSelect={onSelect} style={{backgroundColor: Theme.colors.background}}>
            <BottomNavigationTab  title="Główna" />
            <BottomNavigationTab title="Zamówienia" />
            <BottomNavigationTab title="Przesyłki" />
            <BottomNavigationTab title="Zwroty" />
        </BottomNavigation>
    );
};

