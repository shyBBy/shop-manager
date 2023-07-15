import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {OrderList} from "./OrderList";
import {SafeAreaView} from "react-native-safe-area-context";

const OrdersScreen: React.FC = () => {
    return (
        <>
            <SafeAreaView/>
            <View>
                <OrderList/>
            </View>
        </>
    );
};

export default OrdersScreen;
