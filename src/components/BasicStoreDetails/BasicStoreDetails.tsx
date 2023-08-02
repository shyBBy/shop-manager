import React, {useEffect, useState} from "react";
import {Image, View} from 'react-native';
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";
import {Card, Divider, Text} from "react-native-paper";


export const BasicStoreDetails = () => {
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
            <View style={{width: `100%`, height: 250}}>

                {/* <Image source={require('../../../assets/img/undraw_my_app_re_gxtj.png')} style={{
                    width: 200, // Szerokość obrazka (w pikselach)
                    height: 200, // Wysokość obrazka (w pikselach)
                    marginTop: 10, // Górny margines (w pikselach)
                    borderRadius: 10, // Promień zaokrąglenia narożników (w pikselach)
                }}/> */}
                    <Text>
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
            <View>
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
        </>
    )
}
