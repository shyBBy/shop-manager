import React, {useCallback} from "react";
import {SingleShippingInterface} from "../../../interfaces/shipping.interfaces";
import {Button, Text} from "react-native-paper";
import {Linking, TouchableOpacity, View} from "react-native";
import {OrderProfileInterface} from "../../../interfaces/order.interfaces";

interface ShippingOrderInformationProps {
    shipping: SingleShippingInterface;
    shippingTracking: any;
    order: OrderProfileInterface | null
}


export const ShippingOrderInformation: React.FC<ShippingOrderInformationProps> = ({shipping, order, shippingTracking}) => {

    const handleOpenURL = useCallback(async () => {
        const url = 'https://furgonetka.pl/konto/sprzedaz';
        await Linking.openURL(url);
    }, []);

    const handleOpenTrackingShiping = useCallback(async (url: any) => {
        await Linking.openURL(url);
    }, []);


    if (!shipping) {
        return (
            <View>
                <Text >Etykieta nie została wygenerowana!</Text>
                <Text style={{fontSize: 15}}>Aby utworzyć list przewozowy musisz wygenerować etykietę klikająć w
                    poniższy przycisk.</Text>
                <Button style={{margin: 10}} onPress={handleOpenURL}>Wygeneruj etykiete</Button>
            </View>
        )
    }

    return (
        <>
            <View >
                <Text >Numer przesyłki:</Text>
                <TouchableOpacity onPress={handleOpenURL} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>{shipping.parcels[0].package_no}</Text>
                    <Button onPress={() => handleOpenTrackingShiping(shipping.parcels[0].tracking_url)} >Śledź paczkę</Button>
                </TouchableOpacity>
            </View>
        </>
    );
};