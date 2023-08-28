import React from "react";
import {theme} from "../../theme";
import {View} from "react-native";
import {ActivationForm} from "../../components/Forms/ActivationForm";
import {Card, Text} from "react-native-paper";


export const ActivationScreen = () => {
    return (
        <>
            <View style={{height: '100%', backgroundColor: theme.colors.background}}>
                <View style={{
                    padding: 5,
                    marginTop: `25%`,
                }}>
                    <Card>
                        <Text style={{textAlign: 'justify', padding: 5}}>
                            Korzystanie z aplikacji wymaga potwierdzenia adresu e-mail oraz aktywacji konta. Jeśli tu
                            jesteś to znaczy, że jeszcze tego nie zrobiłeś. Wejdź proszę na swoją skrzynkę pocztową i
                            otwórz wiadomość e-mail. Wklej tutaj swój adres e-mail oraz otrzymany kod aktywacyjny.
                        </Text>
                    </Card>
                    <ActivationForm/>
                </View>
            </View>
        </>
    )
}