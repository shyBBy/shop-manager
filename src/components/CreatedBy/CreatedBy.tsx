import React from "react";
import {Linking, TouchableOpacity} from 'react-native';
import {Text, useTheme} from "react-native-paper";

export const CreatedBy = () => {
    const theme = useTheme();
    const handlePress = async () => {
        const url = 'https://dev-olczak.pl';

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log("Nie można otworzyć URL-a: " + url);
            }
        } catch (error) {
            console.log("Błąd podczas otwierania URL-a: " + error);
        }
    };

    return(
        <TouchableOpacity onPress={handlePress}>
            <Text style={{justifyContent: 'center', textAlign: 'center' }}>
                © Aplikacja stworzona przez Dawid 'shyBBy' Olczak © 2023
            </Text>
        </TouchableOpacity>
    )
}