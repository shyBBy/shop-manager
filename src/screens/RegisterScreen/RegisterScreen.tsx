import React from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {RegisterForm} from "../../components/Forms/RegisterForm";
import {useNavigation} from "@react-navigation/native";
import {RegisterDescribe} from "./RegisterDescribe";
import {LoginNavigationProp} from "../../interfaces/navigation.interfaces";
import {Text} from "react-native-paper";
import {theme} from "../../theme";

export const RegisterScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation<LoginNavigationProp>();

    const handlePress = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={{height: '100%', backgroundColor: theme.colors.background}}>
            <View style={{
                padding: 5,
                marginTop: `25%`,
            }}>
                <RegisterDescribe/>
                <RegisterForm/>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={{ alignSelf: 'center', marginTop: 16 }}>Posiadasz już konto? Zaloguj się!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}