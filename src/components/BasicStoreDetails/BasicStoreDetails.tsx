import React, {useEffect, useState} from "react";
import { Card, Divider, Text, Icon } from "@ui-kitten/components";
import {View} from "react-native";
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";

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
            <View style={{paddingTop: 10}}>
                <Card style={{marginBottom: 30, borderWidth: 1}}>
                    <Text category="h4" style={{ marginBottom: 16, fontWeight: 'bold' }}>
                        Witaj!
                    </Text>
                    <Text category="p1">
                        Witaj w naszej aplikacji do zarządzania zamówieniami, wysyłkami i statusami sklepu na WooCommerce.
                        Tutaj znajdziesz wszystkie narzędzia potrzebne do skutecznego prowadzenia swojego sklepu internetowego.
                        Aplikacja jest intuicyjna i łatwa w obsłudze, abyś mógł skupić się na rozwijaniu swojego biznesu.
                    </Text>
                </Card>

                <Card
                    style={{ marginTop: 24 }}
                    header={() => (
                        <Text
                            category="h6"
                            style={{
                                marginBottom: 8,
                                fontWeight: "bold",
                                color: "#3366FF",
                            }}
                        >
                            Dane Twojego sklepu
                        </Text>
                    )}
                >
                    <View style={{ marginBottom: 8 }}>
                        <Text category="p2">ID: {store?.id}</Text>
                        <Divider style={{ marginVertical: 8 }} />
                        <Text category="p2">Nazwa: {store?.name}</Text>
                        <Divider style={{ marginVertical: 8 }} />
                        <Text category="p2">URL: {store?.url}</Text>
                    </View>
                </Card>
            </View>
        </>
    )
}