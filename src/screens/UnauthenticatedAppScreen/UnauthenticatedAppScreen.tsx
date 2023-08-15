import React, {useState} from "react";
import {Button, Text} from "react-native-paper";
import {Dimensions, Image, StyleSheet, useWindowDimensions, View} from "react-native";

import {StatusBar} from "expo-status-bar";
import {theme} from "../../theme";
import PagerView from 'react-native-pager-view';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {LoginNavigationProp, RegisterNavigationProp} from "../../interfaces/navigation.interfaces";
import {CreatedBy} from "../../components/CreatedBy/CreatedBy";

const shipping = require('../../../assets/img/shipping.png');
const payment = require('../../../assets/img/payment.png');
const shopping = require('../../../assets/img/shopping.png');
const logo = require('../../../assets/logo3.png');

export const UnauthenticatedAppScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0);

    const navigation = useNavigation<LoginNavigationProp | RegisterNavigationProp>();

    const {width, height} = useWindowDimensions();
    const bigScreenSize = width < 300 ? 9 : 40;

    const onPageSelected = (e: any) => {
        setActiveIndex(e.nativeEvent.position);
    };
    return (
        <>
            <StatusBar style={"light"}/>
            <View style={styles.container}>
                <PagerView style={{height: bigScreenSize ? 600 : 560}} initialPage={0} onPageSelected={onPageSelected}>
                    <View key="1">
                        <View style={{padding: 5, marginTop: `7%`, alignItems: 'center'}}>
                            <Text style={{
                                color: theme.colors.primary,
                                fontFamily: 'AsapMedium',
                                fontSize: bigScreenSize ? 35 : 40
                            }}>Witaj!</Text>
                        </View>
                        <View style={{marginTop: `3%`}}>
                            <Image
                                source={logo}
                                style={{
                                    width: screenWidth * 0.82, // Wybierz odpowiednią szerokość w zależności od preferencji
                                    height: undefined,
                                    aspectRatio: 1, // Utrzymuje proporcje obrazka
                                    alignSelf: 'center',
                                    resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                                }}
                            />
                        </View>
                        <View style={{
                            padding: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <Text variant='titleLarge' style={{fontFamily: 'AsapBold'}}>Dowiedź się więcej o mojej
                                aplikacji przesuwając palcem w prawo lub lewo.</Text>
                        </View>
                    </View>
                    <View key="2">
                        <Image
                            source={logo}
                            style={{
                                width: screenWidth * 0.82, // Wybierz odpowiednią szerokość w zależności od preferencji
                                height: undefined,
                                aspectRatio: 1, // Utrzymuje proporcje obrazka
                                alignSelf: 'center',
                                resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                            }}
                        />
                        <View style={{paddingLeft: 10, paddingRight: 10}}>
                            <Text>WooManager to zaawansowana aplikacja do zarządzania sklepem opartym na platformie
                                WooCommerce, która integruje ze sobą niezależne, zewnętrzne systemy.</Text>
                            <Text>Dzięki WooManager wszystko dostępne jest z poziomu aplikacji!</Text>
                        </View>
                    </View>

                    <View key="3">

                        <Image
                            source={shipping}
                            style={{
                                width: screenWidth * 0.82, // Wybierz odpowiednią szerokość w zależności od preferencji
                                height: undefined,
                                aspectRatio: 1, // Utrzymuje proporcje obrazka
                                alignSelf: 'center',
                                resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                                marginTop: 20,
                            }}
                        />
                        <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text variant="bodyMedium">Integracja z furgonetka.pl</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15
                            }}>
                                <Ionicons name="checkbox-outline" size={24} color={theme.colors.primary}/>
                                <Text variant="bodyMedium">Tworzenie przesyłki z dokumentami</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15
                            }}>
                                <Ionicons name="checkbox-outline" size={24} color={theme.colors.primary}/>
                                <Text variant="bodyMedium">Pobieranie etykiety</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15
                            }}>
                                <Ionicons name="checkbox-outline" size={24} color={theme.colors.primary}/>
                                <Text variant="bodyMedium">Status przesyłki</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15
                            }}>
                                <Ionicons name="checkbox-outline" size={24} color={theme.colors.primary}/>
                                <Text variant="bodyMedium">Śledzenie paczki</Text>
                            </View>
                        </View>
                    </View>

                    <View key="4">

                        <Image
                            source={payment}
                            style={{
                                width: screenWidth * 0.82, // Wybierz odpowiednią szerokość w zależności od preferencji
                                height: undefined,
                                aspectRatio: 1, // Utrzymuje proporcje obrazka
                                alignSelf: 'center',
                                resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                                marginTop: 20,
                            }}
                        />
                        <View style={{
                            padding: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <Text>Dzięki naszej aplikacji masz pełną kontrolę nad płatnościami za zamówienia. Sprawdzaj
                                status płatności, dostępne formy płatności oraz daty transakcji. Integrujemy się z PayU,
                                co umożliwia Ci precyzyjne monitorowanie i zarządzanie płatnościami, abyś mógł skupić
                                się na rozwoju swojego sklepu.</Text>
                        </View>
                    </View>

                    <View key="5">

                        <Image
                            source={shopping}
                            style={{
                                width: screenWidth * 0.82, // Wybierz odpowiednią szerokość w zależności od preferencji
                                height: undefined,
                                aspectRatio: 1, // Utrzymuje proporcje obrazka
                                alignSelf: 'center',
                                resizeMode: 'contain', // Dopasowuje obrazek do wymiarów
                                marginTop: 20,
                            }}
                        />
                        <View style={{
                            padding: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <Text>Z naszą aplikacją masz pełną kontrolę nad wszystkimi zamówieniami. Listuj, zarządzaj
                                nimi, a nasz automatyczny system w tle monitoruje statusy, aktualizuje informacje i
                                wysyła e-maile z powiadomieniami. Ponadto, integrujemy się z naszym autorskim systemem
                                zwrotów, ułatwiając Ci kompleksowe zarządzanie zamówieniami i procesem zwrotów.</Text>
                        </View>
                    </View>
                </PagerView>

                <View style={styles.pagination}>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                activeIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
                <View style={{
                    marginTop: `10%`,
                    padding: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: `7%`
                }}>
                    <Button mode='contained' onPress={() => navigation.navigate('Login')}>Zaloguj się</Button>
                    <Button mode='contained' onPress={() => navigation.navigate('Register')}>Stwórz konto</Button>
                </View>
                <CreatedBy/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: `10%`,
    },
    paginationDot: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: 'grey',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: theme.colors.primary,
    },

});