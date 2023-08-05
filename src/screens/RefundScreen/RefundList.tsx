import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {RefreshControl, ScrollView, useWindowDimensions, View} from "react-native";
import Api from "../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../components/Loader/Loader";
import {GetListOfAllRefundsResponse} from "../../interfaces/refund.interface";
import {SingleRefundElementOfList} from "../../components/Refunds/SingleRefundElementOfList";
import {Card, Text, Appbar, Menu} from "react-native-paper";
import {theme} from "../../theme";
import {RemoveRefundAndOrderContext} from "../../context/RemoveRefundAndOrderContext";


export const RefundList = () => {
    const [refundList, setRefundList] = useState<GetListOfAllRefundsResponse>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const {isDeleting} = useContext(RemoveRefundAndOrderContext)

    const {width, height} = useWindowDimensions();
    const fontSize = width < 300 ? 9 : 13;

    const [visible, setVisible] = React.useState(false);
    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [isDeleting]);

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

    const handleRefreshRefundsList = async () => {
        setRefreshing(true);
        await fetchData();
    }


    if (loading || loadingOrders) {
        return <Loader title={"Wczytywanie listy zwrotów..."}/>
    }

    const handleResultsPerPageSelect = (value: any) => {
        setResultsPerPage(value);
        fetchData(); // Call fetchData() again to update the results based on the new value.
    };

    return (
        <>
            <View style={{backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.Content title={'Lista zwrotów'} titleStyle={{color: theme.colors.appBarTitleColor}}/>
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
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefreshRefundsList}/>
                    }
                >
                    {refundList.map((refund) => (
                        <SingleRefundElementOfList refund={refund} key={refund.id}/>
                    ))}


                </ScrollView>
            </View>
        </>
    )
}