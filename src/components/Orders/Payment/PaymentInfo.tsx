import React from "react";
import {Text} from "react-native-paper";
import {OrderProfileInterface} from "../../../interfaces/order.interfaces";
import {View} from "react-native";
import {formatDateWithYearAndHours} from "../../Utils/formatDate.utils";
import {totalNettoCartPriceConverter} from "../../../helpers/totalNettoCartPriceConverter";

interface Props {
    order: OrderProfileInterface | null
}

export const PaymentInfo = (props: Props) => {
    const {order} = props

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Text>Wartość netto zamówienia:</Text>
                <Text>{`${totalNettoCartPriceConverter(order?.shipping_total, order?.shipping_tax, order?.cart_tax, order?.total)} zł`}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Text>Koszt wysyłki netto:</Text>
                <Text>{`${order?.shipping_total} zł`}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Text>Podatek:</Text>
                <Text>{`${order?.total_tax} zł`}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Text  style={{fontSize: 17}}>Łączna wartość brutto:</Text>
                <Text  style={{fontSize: 17}}>{`${order?.total} zł`}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                <Text>Rodzaj:</Text>
                <Text>{order?.payment_method_title}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Text>Data:</Text>
                <Text>{formatDateWithYearAndHours(order?.date_paid)}</Text>
            </View>
        </View>

    )
}