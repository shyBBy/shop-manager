import React, {useEffect, useState} from "react";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {GetOneOrderResponse} from "../../../interfaces/order.interfaces";
import Api from "../../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../../components/Loader/Loader";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Card, Layout, Text} from "@ui-kitten/components";
import {RefundRes} from "../../../interfaces/refund.interface";
import {RefundDetails} from "../../../components/Refunds/RefundDetails";



interface SingleRefundProfileParams {
    refundId: number;
}

export const SingleRefundProfileScreen = () => {

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, SingleRefundProfileParams>, string>>();
    const [refund, setRefund] = useState<RefundRes | null>(null)
    const [loading, setLoading] = useState(true);
    const {refundId} = route.params;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            const data = await Api.getRefund(refundId);
            setRefund(data.refund);
            setLoading(false);
        } catch (e) {
            console.error("Error fetching refunds", e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const handleRefreshRefund = async () => {
        setRefreshing(true);
        await fetchData();
    }

    if (loading) {
        return (
            <SafeAreaView>
                <Loader title={'Wczytywanie szczegółowych danych zwrotu'}/>
            </SafeAreaView>
        );
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return(
        <>
            <SafeAreaView/>
            <Layout style={styles.layoutContainer}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={27} color="black" onPress={handleGoBack}/>
                    <Text style={styles.orderTitle} category='h5'>Zwrot nr: #{refundId}</Text>
                </View>
            </Layout>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefreshRefund}/>
            }>
                <Layout>
                    <Card>
                        <Text category='h6'>Szczegóły zwrotu</Text>
                        <RefundDetails/>
                    </Card>
                </Layout>
                <Layout>
                    <Card>
                        <Text>Test</Text>
                    </Card>
                </Layout>
                <Layout>
                    <Card>
                        <Text>Test</Text>
                    </Card>
                </Layout>

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    layoutContainer: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        padding: 10
    },
    backText: {
        marginLeft: 8,
        marginRight: 8,
    },
    orderTitle: {
        marginLeft: 15,
    },
});

