import React, {useEffect, useState} from "react";
import {Image, View, StyleSheet, Dimensions, } from 'react-native';
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";
import {Card, Divider, Text} from "react-native-paper";
import {theme} from "../../theme";

const image = require('../../../assets/img/myApp2.png');

export const BasicStoreDetails = () => {
    const screenWidth = Dimensions.get('window').width;
    const {user} = useAuth();
    const [store, setStore] = useState<any>(null);
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const storeData = await StorageManager.getObject('store');
                setStore(storeData);
            } catch (error) {
            }
        };


        fetchStore();
    }, []);

    return (
        <>
            <View style={{flex: 1}}>
                <View style={[styles.container, styles.firstView]}>

                    <Image
                        source={image}
                        style={{
                            width: screenWidth * 0.92, // Wybierz odpowiednią szerokość w zależności od preferencji
                            height: undefined,
                            aspectRatio: 1, // Utrzymuje proporcje obrazka
                            alignSelf: 'center',
                            resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                        }}
                    />
                    <Text variant='displayLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>
                        Witaj!
                    </Text>
                    <Text>
                        Witaj w naszej aplikacji do zarządzania zamówieniami, wysyłkami i statusami sklepu na
                        WooCommerce.
                        Tutaj znajdziesz wszystkie narzędzia potrzebne do skutecznego prowadzenia swojego sklepu
                        internetowego.
                        Aplikacja jest intuicyjna i łatwa w obsłudze, abyś mógł skupić się na rozwijaniu swojego
                        biznesu.
                    </Text>


                </View>
                <View style={[styles.container, styles.secondView]}>
                    <Card>
                        <Text>
                            Dane Twojego sklepu
                        </Text>

                        <View style={{marginBottom: 8}}>
                            <Text>ID: {store?.id}</Text>
                            <Divider style={{marginVertical: 8}}/>
                            <Text>Nazwa: {store?.name}</Text>
                            <Divider style={{marginVertical: 8}}/>
                            <Text>URL: {store?.url}</Text>
                            <Divider style={{marginVertical: 8}}/>
                        </View>

                    </Card>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text>Strona główna w trakcie tworzenia, będą tu podstawowe statystyki dotyczące sklepu, ilośc zamówień, kwoty itp etc.</Text>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    firstView: {
        backgroundColor: theme.colors.background, // Kolor tła dla pierwszego widoku
    },
    secondView: {
        backgroundColor: theme.colors.primary, // Kolor tła dla drugiego widoku
    },
});