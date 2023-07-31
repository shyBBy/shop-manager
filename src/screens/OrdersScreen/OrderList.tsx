import React, {useEffect, useState} from "react";
import {GetListOfOrdersResponse, OrderStatus} from "../../interfaces/order.interfaces";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {SafeAreaView} from "react-native-safe-area-context";
import {SingleOrderElementOfList} from "../../components/Orders/SingleOrderElementOfList";
import {RefreshControl, ScrollView, useWindowDimensions, View} from "react-native";
import {Card, Layout, Tab, TabBar, Text} from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";

interface OrderListProps {
    orders: GetListOfOrdersResponse[];
}

export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfOrdersResponse>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const navigation = useNavigation();
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {width, height} = useWindowDimensions();
    const fontSize = width < 300 ? 9 : 13;

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const orders = await Api.getAllOrders();
            setOrdersList(orders);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterOrdersByStatus = (status: OrderStatus) => {
        if (status === OrderStatus.ALL) {
            return ordersList;
        }

        return ordersList.filter((order) => order.status === status);
    };

    const handleTabSelect = (selectedIndex: number) => {
        setSelectedTabIndex(selectedIndex);
    };

    const handleRefreshOrders = async () => {
        setRefreshing(true);
        await fetchData();
    };

    if (loading || loadingOrders) {
        return (
            <SafeAreaView>
                <Loader title={"Wczytywanie listy zamówień..."}/>
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


    const CustomTab = ({title, textStyle}: { title: string; textStyle: object }) => (
        <Text style={textStyle}>{title}</Text>
    );

    return (
        <>
            <Layout>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 15
                }}>
                    <Text category="h6">Lista zamówień</Text>
                </View>
                <TabBar selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
                    {orderStatusTabs.map((tab) => (
                        <Tab
                            title={() => (
                                <CustomTab title={tab.title} textStyle={{fontSize}}/>
                            )}
                            key={tab.status}
                        />
                    ))}
                </TabBar>
            </Layout>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefreshOrders}/>
                }
            >
                <Layout style={{flex: 1}}>
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
            </ScrollView>
        </>
    );
};