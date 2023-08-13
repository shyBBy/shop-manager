import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import LoginForm from "../../components/Forms/LoginForm";
import {CreatedBy} from "../../components/CreatedBy/CreatedBy";
import {useNavigation} from "@react-navigation/native";
import {Text} from "react-native-paper";
import {theme} from "../../theme";
import {RegisterNavigationProp} from "../../interfaces/navigation.interfaces";


const logoImage = require('../../../assets/logo3.png'); // Załóżmy, że logo znajduje się w folderze assets


const LoginScreen: React.FC = () => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation<RegisterNavigationProp>();

    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={{height: '100%', backgroundColor: theme.colors.background}}>
            <View style={{
                padding: 5,
                marginTop: `5%`,
            }}>
                <View>
                    <Image
                        source={logoImage}
                        style={{
                            width: screenWidth * 0.6, // Wybierz odpowiednią szerokość w zależności od preferencji
                            height: undefined,
                            aspectRatio: 1, // Utrzymuje proporcje obrazka
                            alignSelf: 'center',
                            resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                        }}
                    />
                </View>
                <LoginForm/>
                <TouchableOpacity onPress={handleRegisterPress}>
                    <Text style={{alignSelf: 'center', marginTop: 16}}>Nie masz konta? Zarejestruj się</Text>
                </TouchableOpacity>
                <CreatedBy/>
            </View>
        </View>
    );
};

export default LoginScreen;
