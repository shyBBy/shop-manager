import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {RefreshControl, ScrollView, useWindowDimensions, View} from "react-native";
import Api from "../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../components/Loader/Loader";
import {GetListOfAllRefundsResponse} from "../../interfaces/refund.interface";
import {SingleRefundElementOfList} from "../../components/Refunds/SingleRefundElementOfList";
import {Card, Text} from "react-native-paper";


export const RefundList = () => {
    const [refundList, setRefundList] = useState<GetListOfAllRefundsResponse>([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefreshRefunds}/>
                }
            >

                    <View style={{flex: 1}}>
                        {refundList.map((refund) => (
                            <View key={refund.uuid} style={{marginTop: 15}}>
                                <Card>
                                    <SingleRefundElementOfList refund={refund}/>
                                </Card>
                            </View>
                        ))}
                    </View>


            </ScrollView>
        </>
    )
}