import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {OrderList} from "./OrderList";

const OrdersScreen: React.FC = () => {
    return (
        <ScrollView>
            <View>
                <OrderList/>
            </View>
        </ScrollView>
    );
};

export default OrdersScreen;
