import React, {useEffect, useState} from "react";
import {GetListOfOrdersResponse, OrderStatus} from "../../interfaces/order.interfaces";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {SafeAreaView} from "react-native-safe-area-context";
import {SingleOrderElementOfList} from "../../components/Orders/SingleOrderElementOfList";
import {View} from "react-native";
import {Button, Layout, Tab, TabBar, Text} from "@ui-kitten/components";


export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfOrdersResponse>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const orders = await Api.getAllOrders();
            setOrdersList(orders);
            setLoading(false);
        })();
    }, []);

    const filterOrdersByStatus = (status: OrderStatus) => {
        if (status === OrderStatus.ALL) {
            return ordersList;
        }

        return ordersList.filter((order) => order.status === status);
    };

    const handleTabSelect = (selectedIndex: number) => {
        setSelectedTabIndex(selectedIndex);
    };

    if (loading) {
        return (
            <SafeAreaView>
                <Loader/>
            </SafeAreaView>
        );
    }

    const orderStatusTabs = [
        {title: "Wszystkie", status: OrderStatus.ALL},
        {title: "Wysłane", status: OrderStatus.SENT},
        {title: "W trakcie realizacji", status: OrderStatus.IN_PROGRESS},
        {title: "Zrealizowane", status: OrderStatus.COMPLETED},
        {title: "Anulowane", status: OrderStatus.CANCELLED},
    ];

    const filteredOrders = filterOrdersByStatus(
        orderStatusTabs[selectedTabIndex].status
    );

    return (
        <Layout style={{flex: 1}}>
            <TabBar
                selectedIndex={selectedTabIndex}
                onSelect={handleTabSelect}
            >
                {orderStatusTabs.map((tab) => (
                    <Tab title={tab.title} key={tab.status}/>
                ))}
            </TabBar>
            <View style={{flex: 1}}>
                {filteredOrders.map((order) => (
                    <SingleOrderElementOfList order={order} key={order.id}/>
                ))}
                {/*<Button style={{padding: 5}} appearance='outline' status='info' size='small'>Wyświetl więcej</Button>*/}
            </View>
        </Layout>
    );
};