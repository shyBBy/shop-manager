import React from "react";
import {Card, Text} from "react-native-paper";
import {theme} from "../../../../theme";
import {checkDeviceFontSize} from "../../../../helpers/checkDeviceFontSize";
import {CreateStoreForm} from "../../../../components/Forms/CreateStoreForm";
import {StyleSheet, View} from "react-native";

export const StepTwo = () => {
    const bigScreenSize = checkDeviceFontSize();
    return(
        <>
            <Text style={{marginLeft: 10, color: theme.colors.appBarTitleColor, fontFamily: 'BebasNeu', padding: 3, fontSize: bigScreenSize ? 14 : 18}}>1. Wygenerowanie kluczy API</Text>
            <Card style={styles.card}>
                <Text>
                    1. Zaloguj się do panelu administratora swojego sklepu WooCommerce.
                </Text>
                <Text>
                    2. Przejdź do sekcji "Ustawienia" (Settings) w menu bocznym.
                </Text>
                <Text>
                    3. Wybierz zakładkę "API" (API).
                </Text>
                <Text>
                    4. Kliknij przycisk "Utwórz klucz" (Generate API Key) lub "Dodaj klucz" (Add Key).
                </Text>
                <Text>
                    5. Podaj opis dla swojego klucza (np. "Moje aplikacje"), wybierz uprawnienia dostępu
                    (zalecane minimum to "Widok" - Read) i kliknij przycisk "Generuj klucz" (Generate Key).
                </Text>
                <Text>
                    6. Po wygenerowaniu klucza klienta i klucza sekretnego, skopiuj je i zapisz w bezpiecznym miejscu.
                </Text>
                <Text>
                    7. Przejdź dalej!
                </Text>
            </Card>

        </>
    )
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 12,
        borderRadius: 5,
        borderBottomColor: theme.colors.primary,
        borderStyle: 'solid',
        borderWidth: 1
    },
});

