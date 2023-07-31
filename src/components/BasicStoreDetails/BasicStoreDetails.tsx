import React, {useEffect, useState} from "react";
import {Card, Divider, Layout, Text} from "@ui-kitten/components";
import {Image, View} from 'react-native';
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";
import {Theme} from "../../theme";


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
            <View style={{backgroundColor: Theme.colors.primary, width: `100%`, height: 250}}>

                <Image source={require('../../../assets/img/undraw_my_app_re_gxtj.png')} style={{
                    width: 200, // Szerokość obrazka (w pikselach)
                    height: 200, // Wysokość obrazka (w pikselach)
                    marginTop: 10, // Górny margines (w pikselach)
                    borderRadius: 10, // Promień zaokrąglenia narożników (w pikselach)
                }}/>
                    <Text style={{
                        marginBottom: 10,
                        color: Theme.text.colors.accent,
                        fontSize: 30,
                        fontFamily: Theme.text.fonts.SectionTitleFont
                    }}>
                        Witaj!
                    </Text>
                    <Text style={{
                        color: Theme.text.colors.primary,
                        fontFamily: Theme.text.fonts.RegularFont,
                        fontSize: Theme.text.size.body2
                    }}>
                        Witaj w naszej aplikacji do zarządzania zamówieniami, wysyłkami i statusami sklepu na
                        WooCommerce.
                        Tutaj znajdziesz wszystkie narzędzia potrzebne do skutecznego prowadzenia swojego sklepu
                        internetowego.
                        Aplikacja jest intuicyjna i łatwa w obsłudze, abyś mógł skupić się na rozwijaniu swojego
                        biznesu.
                    </Text>

            </View>
            <View style={{ backgroundColor: Theme.colors.background}}>
                <Card
                    style={{
                        marginTop: 24,
                        backgroundColor: Theme.card.backgroundColor,
                        borderColor: Theme.card.backgroundColor
                    }}
                >
                    <Text style={{
                        marginBottom: 8,
                        fontFamily: Theme.text.fonts.SectionTitleFont,
                        color: Theme.text.colors.accent,
                    }}
                    >
                        Dane Twojego sklepu
                    </Text>

                    <View style={{marginBottom: 8}}>
                        <Text style={{
                            color: Theme.text.colors.primary,
                            fontFamily: Theme.text.fonts.RegularFont,
                            fontSize: Theme.text.size.body2
                        }}>ID: {store?.id}</Text>
                        <Divider style={{marginVertical: 8, backgroundColor: Theme.colors.grey}}/>
                        <Text style={{
                            color: Theme.text.colors.primary,
                            fontFamily: Theme.text.fonts.RegularFont,
                            fontSize: Theme.text.size.body2
                        }}>Nazwa: {store?.name}</Text>
                        <Divider style={{marginVertical: 8, backgroundColor: Theme.colors.grey}}/>
                        <Text style={{
                            color: Theme.text.colors.primary,
                            fontFamily: Theme.text.fonts.RegularFont,
                            fontSize: Theme.text.size.body2
                        }}>URL: {store?.url}</Text>
                        <Divider style={{marginVertical: 8, backgroundColor: Theme.colors.grey}}/>
                    </View>
                </Card>
            </View>
        </>
    )
}
