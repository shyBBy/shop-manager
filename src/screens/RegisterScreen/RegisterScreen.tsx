import React from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {Layout, Text} from "@ui-kitten/components";
import {RegisterForm} from "../../components/Forms/RegisterForm";
import {useNavigation} from "@react-navigation/native";
import {LoginNavigationProp} from "../../hooks/useAuth";
import {RegisterDescribe} from "./RegisterDescribe";

export const RegisterScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation<LoginNavigationProp>();

    const handlePress = () => {
        navigation.navigate('Login');
    };
    return (
        <Layout style={{height: '100%'}}>
            <View>
                <RegisterDescribe/>
                <RegisterForm/>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={{ alignSelf: 'center', marginTop: 16 }}>Posiadasz już konto? Zaloguj się!</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}