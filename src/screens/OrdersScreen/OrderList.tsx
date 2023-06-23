import React, {useEffect, useState} from "react";
import {GetListOfOrdersResponse} from "../../interfaces/order.interfaces";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {SafeAreaView} from "react-native-safe-area-context";
import {Card, Text} from "@ui-kitten/components";
import {SingleOrderElementOfList} from "../../components/Orders/SingleOrderElementOfList";

export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfOrdersResponse>([])

    useEffect(() => {
        (async () => {
            const orders = await Api.getAllOrders()
            setOrdersList(orders)
        })();
    }, []);

    if (ordersList === null) {
        return (
            <SafeAreaView>
                <Loader />
            </SafeAreaView>
        )
    }

    return (
        <>
            {
                ordersList.map(order => (
                    <SingleOrderElementOfList order={order} key={order.id}/>
                ))
            }
        </>
    )
}