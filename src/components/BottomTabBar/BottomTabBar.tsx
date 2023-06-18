import React from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
    const onSelect = (index: number) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
            <BottomNavigationTab title="Główna" />
            <BottomNavigationTab title="Zamówienia" />
            <BottomNavigationTab title="Ustawienia" />
            <BottomNavigationTab title="Sklep" />
        </BottomNavigation>
    );
};

