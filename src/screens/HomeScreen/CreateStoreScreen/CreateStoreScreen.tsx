import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Card, Text} from "react-native-paper";
import {CreateStoreForm} from "../../../components/Forms/CreateStoreForm";
import {View} from "react-native";
import {theme} from "../../../theme";
import {SafeAreaView} from "react-native-safe-area-context";

interface TopTabBarProps {
    navigation: any;
    state: any;
}

const {Navigator, Screen} = createMaterialTopTabNavigator();

export const TutorialScreen = () => (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Card>
            <Text style={{marginBottom: 10}}>Konfiguracja sklepu WooCommerce</Text>
            <Text style={{marginBottom: 15}}>
                Jeśli widzisz ten komunikat, oznacza to, że nie masz jeszcze skonfigurowanego sklepu WooCommerce.
                Aby wygenerować klucz klienta (consumer key) i klucz sekretny (consumer secret) dla swojego sklepu
                WooCommerce,
                postępuj zgodnie z poniższymi krokami:
            </Text>
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
                Gotowe! Teraz możesz użyć tych kluczy do integracji swojego sklepu WooCommerce z innymi aplikacjami lub
                usługami.
            </Text>
        </Card>
    </View>
);

const CreateStoreScreen = () => (
    <View style={{flex: 1, padding: 20}}>
        <CreateStoreForm/>
    </View>
);

// const TopTabBar = ({navigation, state}: TopTabBarProps) => (
//     <TabBar
//         selectedIndex={state.index}
//         onSelect={index => navigation.navigate(state.routeNames[index])}>
//         <Tab title='PORADNIK'/>
//         <Tab title='DODAJ SKLEP'/>
//     </TabBar>
// );

// const TabNavigator = () => (
//     <Navigator tabBar={props => <TopTabBar {...props} />}>
//         <Screen name='Users' component={TutorialScreen}/>
//         <Screen name='Orders' component={CreateStoreScreen}/>
//     </Navigator>
// );


export const CreateStoreScreenContainer = () => {
    return (
        <>
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Text>TEST</Text>
            </View>
        </>

    )
}