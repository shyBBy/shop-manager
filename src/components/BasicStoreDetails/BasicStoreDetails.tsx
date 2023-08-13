import React, {useEffect, useState} from "react";
import {Image, View, StyleSheet, Dimensions, ToastAndroid,} from 'react-native';
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";
import {Button, Card, Divider, Text} from "react-native-paper";
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

    const { signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };

    return (
        <>
            <View style={{flex: 1}}>
                <View style={[styles.container, styles.firstView]}>

                </View>

                <View>
                    <Button onPress={handleSignOut}>Wyloguj</Button>
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