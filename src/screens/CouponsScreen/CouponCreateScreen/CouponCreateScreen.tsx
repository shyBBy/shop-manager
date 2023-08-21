import React from "react";
import {checkDeviceFontSize} from "../../../helpers/checkDeviceFontSize";
import {useNavigation} from "@react-navigation/native";
import {theme} from "../../../theme";
import {RefreshControl, ScrollView, View} from "react-native";
import {Appbar} from "react-native-paper";
import {CreateCouponForm} from "../../../components/Forms/CreateCouponForm";


export const CouponCreateScreen = () => {

    const bigScreenSize = checkDeviceFontSize();

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return(
        <>
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.BackAction onPress={handleGoBack}/>
                    <Appbar.Content title={`Dodawanie kuponu`}/>
                </Appbar.Header>
                <ScrollView>
                    <View style={{backgroundColor: theme.colors.background, padding: 10}}>
                        <CreateCouponForm/>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}