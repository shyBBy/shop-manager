import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Avatar,
    Icon,
    IconElement,
    MenuItem,
    OverflowMenu,
    Text,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';


const MenuIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='more-vertical'
    />
);

const InfoIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='info'
    />
);

const LogoutIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='log-out'
    />
);

export const TopBarNavigation = (): React.ReactElement => {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = (): void => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={MenuIcon}
            onPress={toggleMenu}
        />
    );

    const renderOverflowMenuAction = (): React.ReactElement => (
        <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}
        >
            <MenuItem
                accessoryLeft={InfoIcon}
                title='About'
            />
            <MenuItem
                accessoryLeft={LogoutIcon}
                title='Logout'
            />
        </OverflowMenu>
    );

    const renderTitle = (props: any): React.ReactElement => (
        <View style={styles.titleContainer}>
            <Text {...props}>
                Eva Application
            </Text>
        </View>
    );

    return (
        <TopNavigation
            title={renderTitle}
            accessoryRight={renderOverflowMenuAction}
        />
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        marginHorizontal: 16,
    },
});