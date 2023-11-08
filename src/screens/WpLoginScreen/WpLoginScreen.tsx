import React from "react";
import {Text} from "react-native-paper";
import {theme} from "../../theme";
import {View} from "react-native";
import {WpLoginDescription} from "./WpLoginDescription";
import {WpLoginForm} from "../../components/Forms/WpLoginForm";

export const WpLoginScreen = () => {
    return(
        <View style={{height: '100%', backgroundColor: theme.colors.background}}>
            <View style={{
                padding: 5,
                marginTop: `20%`,
            }}>
                <WpLoginDescription/>
                <WpLoginForm/>
            </View>
        </View>
    )
}