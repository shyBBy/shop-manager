import React from "react";
import {Text} from "@ui-kitten/components";
import {RouteProp, useRoute} from "@react-navigation/native";

interface SingleOrderProfileParams {
    orderId: number;
}


export const SingleOrderProfileScreen = () => {
    const route = useRoute<RouteProp<Record<string, SingleOrderProfileParams>, string>>();

    const { orderId } = route.params;
    return (
        <>
            <Text>Odczytane ID: {orderId}</Text>
        </>
    );
}