import React, {useEffect, useState} from "react";
import {GetListOfOrdersResponse, OrderStatus} from "../../interfaces/order.interfaces";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {SingleOrderElementOfList} from "../../components/Orders/SingleOrderElementOfList";
import {RefreshControl, ScrollView, useWindowDimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Appbar, Menu, Text} from "react-native-paper";
import {theme} from "../../theme";


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
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const [visible, setVisible] = React.useState(false);
    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);


    const {width, height} = useWindowDimensions();
    const fontSize = width < 300 ? 9 : 13;

    const containerStyle = {backgroundColor: 'white', padding: 20};


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


    const handleRefreshOrders = async () => {
        setRefreshing(true);
        await fetchData();
    };

    if (loading || loadingOrders) {
        return <Loader title={"Wczytywanie listy zamówień..."}/>;
    }


    const handleResultsPerPageSelect = (value: any) => {
        setResultsPerPage(value);
        fetchData(); // Call fetchData() again to update the results based on the new value.
    };


    return (
        <>
            <View style={{backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.Content title={'Lista zamówień'} titleStyle={{color: theme.colors.appBarTitleColor}}/>
                    <Menu
                        visible={visible}
                        onDismiss={hideMenu}
                        anchor={
                            <Appbar.Action icon="format-list-bulleted" onPress={showMenu}/>
                        }
                        style={{marginTop: 60}}
                    >
                        <Menu.Item onPress={() => handleResultsPerPageSelect(10)} title="10"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(20)} title="20"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(30)} title="30"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(40)} title="40"/>
                    </Menu>
                    <Text style={{marginRight: 7}}>Max {resultsPerPage}</Text>
                </Appbar.Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefreshOrders}/>
                    }
                >

                    {ordersList.map((order) => (
                        <SingleOrderElementOfList order={order} key={order.id}/>
                    ))}
                </ScrollView>
            </View>
        </>
    );
};