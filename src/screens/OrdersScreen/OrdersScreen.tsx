import React from 'react';
import { View, Text } from 'react-native';
import {OrderList} from "./OrderList";

const OrdersScreen: React.FC = () => {
    return (
        <View>
            <OrderList/>
        </View>
    );
};

export default OrdersScreen;
