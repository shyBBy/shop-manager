import React, {useCallback} from "react";
import {SingleShippingInterface} from "../../../interfaces/shipping.interfaces";
import {Button, Text} from "react-native-paper";
import {Linking, useWindowDimensions, View} from "react-native";
import {OrderProfileInterface} from "../../../interfaces/order.interfaces";

interface ShippingOrderInformationProps {
    shipping: SingleShippingInterface;
    shippingTracking: any;
    order: OrderProfileInterface | null
}


export const ShippingOrderInformation: React.FC<ShippingOrderInformationProps> = ({shipping, order, shippingTracking
}) => {
    const { width } = useWindowDimensions();
    const isNormalScreenSize = width <= 300;

    const handleOpenURL = useCallback(async () => {
        const url = 'https://furgonetka.pl/konto/sprzedaz';
        await Linking.openURL(url);
    }, []);

    const handleOpenTrackingShipping = useCallback(async (url: any) => {
        await Linking.openURL(url);
    }, []);

    const handleOpenShippingLabelDownload = useCallback(async (shippingId: any) => {
        await Linking.openURL(`https://furgonetka.pl/konto/zamowione/${shippingId}`);
    }, []);


    if (!shipping) {
        return (
            <View>
                <Text>Etykieta nie została wygenerowana!</Text>
                <Text style={{fontSize: 15}}>Aby utworzyć list przewozowy musisz wygenerować etykietę klikająć w
                    poniższy przycisk.</Text>
                <Button style={{margin: 10}} mode='contained' onPress={handleOpenURL}>Wygeneruj etykiete</Button>
            </View>
        )
    }

    return (
        <>
            <View style={{flexDirection: isNormalScreenSize ? 'row' : 'column', justifyContent: 'space-between'}}>
                <Text>Numer przesyłki:</Text>
                <Text>{shipping.parcels[0].package_no}</Text>
            </View>
            <View style={{flexDirection: isNormalScreenSize ? 'row' : 'column', justifyContent: 'space-around', marginTop: 15,}}>
                <Button onPress={() => handleOpenShippingLabelDownload(shipping.parcels[0].package_no)}
                        mode='contained'>Pobierz etykiete PDF</Button>
                <Button onPress={() => handleOpenTrackingShipping(shipping.parcels[0].tracking_url)}
                        mode='contained'style={{marginTop: isNormalScreenSize ? 0 : 20}} >Śledź paczkę</Button>
            </View>
        </>
    );
};