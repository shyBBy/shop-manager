import React, {useEffect, useState} from "react";
import {GetListOfOrdersResponse, OrderStatus} from "../../interfaces/order.interfaces";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {SafeAreaView} from "react-native-safe-area-context";
import {SingleOrderElementOfList} from "../../components/Orders/SingleOrderElementOfList";
import {TouchableOpacity, View} from "react-native";
import {Card, Layout, Tab, TabBar, Text} from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

interface OrderListProps {
    orders: GetListOfOrdersResponse[];
}

export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfOrdersResponse>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const navigation = useNavigation();
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        (async () => {
            const orders = await Api.getAllOrders();
            console.log(orders)
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


    if (loading || loadingOrders) {
        return (
            <SafeAreaView>
                <Loader title={'Wczytywanie listy zamówień...'}/>
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

    const handleRefreshOrders = async () => {
        try {
            setLoadingOrders(true);
            const orders = await Api.getAllOrders();
            setOrdersList(orders);
        } catch (error) {
            console.error("Error refreshing orders", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    return (
        <SafeAreaView>
            <Layout style={{flex: 1}}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 15}}>
                        <Text category='h6' >Lista zamówień</Text>
                        <TouchableOpacity onPress={handleRefreshOrders} style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="reload-circle-outline" size={20} color="black" />
                            <Text>Odśwież listę zamówień</Text>
                        </TouchableOpacity>
                    </View>
                    <TabBar
                        selectedIndex={selectedTabIndex}
                        onSelect={handleTabSelect}
                    >
                        {orderStatusTabs.map((tab) => (
                            <Tab title={tab.title} key={tab.status}/>
                        ))}
                    </TabBar>
                </View>
                <View style={{flex: 1, marginTop: 40}}>
                    {filteredOrders.map((order) => (
                        <Layout key={order.id}>
                            <Card>
                                <SingleOrderElementOfList order={order}/>
                            </Card>
                        </Layout>
                    ))}
                </View>
            </Layout>
        </SafeAreaView>
    );
};