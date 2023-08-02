import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {RefreshControl, ScrollView, useWindowDimensions, View} from "react-native";
import Api from "../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../components/Loader/Loader";
import {GetListOfAllRefundsResponse} from "../../interfaces/refund.interface";
import {SingleRefundElementOfList} from "../../components/Refunds/SingleRefundElementOfList";
import {Card, Text, Appbar, Menu} from "react-native-paper";


export const RefundList = () => {
    const [refundList, setRefundList] = useState<GetListOfAllRefundsResponse>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const {width, height} = useWindowDimensions();
    const fontSize = width < 300 ? 9 : 13;

    const [visible, setVisible] = React.useState(false);
    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const refunds = await Api.getAllRefunds();
            setRefundList(refunds);
        } catch (error) {
            console.error("Error fetching refunds", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefreshRefunds = async () => {
        setRefreshing(true);
        await fetchData();
    }


    if (loading || loadingOrders) {
        return (
            <SafeAreaView>
                <Loader title={"Wczytywanie listy zwrotów..."}/>
            </SafeAreaView>
        );
    }

    const handleResultsPerPageSelect = (value: any) => {
        setResultsPerPage(value);
        fetchData(); // Call fetchData() again to update the results based on the new value.
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title={'Lista zwrotów'}/>
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
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefreshRefunds}/>
                }
            >
                {refundList.map((refund) => (
                    <SingleRefundElementOfList refund={refund} key={refund.id}/>
                ))}


            </ScrollView>
        </>
    )
}