import React from 'react';
import {View, Text, Button, ToastAndroid} from 'react-native';
import {useAuth} from "../../hooks/useAuth";

const SettingsScreen: React.FC = () => {
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };
    return (
        <View>
            <Button title="Wyloguj" onPress={handleSignOut} />
        </View>
    );
};

export default SettingsScreen;
