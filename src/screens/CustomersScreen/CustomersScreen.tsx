import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../hooks/useAuth";
import {ToastAndroid, View} from "react-native";
import {theme} from "../../theme";
import {Appbar, Button, Text} from "react-native-paper";
import {CustomersList} from "./CustomersList";


export const CustomersScreen = () => {

    const navigation = useNavigation();
    const {signOut} = useAuth();
    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };

    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <CustomersList/>
        </View>
    )
}