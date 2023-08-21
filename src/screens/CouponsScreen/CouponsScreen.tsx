import React from "react";
import {theme} from "../../theme";
import {ToastAndroid, TouchableOpacity, View} from "react-native";
import {Appbar, Button} from 'react-native-paper';
import {useAuth} from "../../hooks/useAuth";
import {CouponsList} from "./CouponsList";
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

export const CouponsScreen: React.FC = () => {
    const navigation = useNavigation();
    const {signOut} = useAuth();
    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };

    const showCouponCreateScreen = () => {
        // @ts-ignore
        navigation.navigate("CouponCreate");
    };

    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                <Appbar.Content title={'Kupony'} titleStyle={{color: theme.colors.appBarTitleColor}}/>
                <Button onPress={handleSignOut}>Wyloguj</Button>
            </Appbar.Header>
            <CouponsList/>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 10,
                margin: 20
            }}>
                <TouchableOpacity onPress={() => showCouponCreateScreen()}>
                    <Ionicons name="add-circle" size={50} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}