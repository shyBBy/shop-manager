import React from "react";
import {CreateStoreForm} from "../../../../components/Forms/CreateStoreForm";
import {theme} from "../../../../theme";
import {Text} from "react-native-paper";
import {checkDeviceFontSize} from "../../../../helpers/checkDeviceFontSize";
import {View} from "react-native";

export const StepFour = () => {
    const bigScreenSize = checkDeviceFontSize();
    return(
        <>
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
                <Text style={{marginLeft: 10, color: theme.colors.appBarTitleColor, fontFamily: 'BebasNeu', padding: 3, fontSize: bigScreenSize ? 17 : 18}}>2. Dodawanie sklepu</Text>
            </View>
            <CreateStoreForm/>
        </>
    )
}