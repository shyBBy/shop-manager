import React, {useEffect, useState} from "react";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {GetOneOrderResponse} from "../../../interfaces/order.interfaces";
import Api from "../../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../../components/Loader/Loader";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {formatDateWithYearAndHours} from "../../../components/Utils/formatDate.utils";
import {getStatusColor, OrderStatusConverter} from "../../../helpers/orderStatusConverter";
import {SingleProductElementOfList} from "../../../components/Orders/SingleProductElementOfList";
import {ShippingOrderInformation} from "../../../components/Orders/ShippingOrder/ShippingOrderInformation";
import {PaymentInfo} from "../../../components/Orders/Payment/PaymentInfo";

import {Card, Text} from "react-native-paper";

interface SingleOrderProfileParams {
    orderId: number;
}


export const SingleOrderProfileScreen = (props: any) => {
    const {route} = props
    const navigation = useNavigation();
    // const route = useRoute<RouteProp<Record<string, SingleOrderProfileParams>, string>>();
    const [order, setOrder] = useState<GetOneOrderResponse | null>(null)
    const [shipping, setShipping] = useState<any>(null)
    const [shippingTracking, setShippingTracking] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const {orderId} = route.params;
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            const data = await Api.getOrder(orderId);
            setOrder(data.order);
            setShipping(data.shipping)
            setShippingTracking(data.shipping_tracking)
            setLoading(false);
        } catch (e) {
            console.error("Error fetching orders", e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const handleRefreshOrders = async () => {
        setRefreshing(true);
        await fetchData();
    };

    if (loading) {
        return (
            <SafeAreaView>
                <Loader title={'Wczytywanie szczegółowych danych zamówienia'}/>
            </SafeAreaView>
        );
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <SafeAreaView style={styles.container}/>
            <View style={styles.layoutContainer}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={27} color="black" onPress={handleGoBack}/>
                    <Text style={styles.orderTitle}>Zamówienie: #{orderId}</Text>
                </View>
            </View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefreshOrders}/>
            }>
                <View>
                    <Card>
                        <Text>{formatDateWithYearAndHours(order?.date_created)}</Text>
                        <Text>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{
                                backgroundColor: getStatusColor(order?.status),
                                borderRadius: 4,
                                padding: 4,
                                alignSelf: 'flex-start',
                                marginTop: 4,
                            }}>
                                <Text style={{color: '#46494c', flexGrow: 1}}>
                                    {OrderStatusConverter(order?.status)}
                                </Text>
                            </View>
                            <AntDesign name="edit" size={24} color="black"/>
                        </View>
                    </Card>
                </View>

                <View>
                    <Card>
                        <Text>Dane kupującego:</Text>
                        <View>
                            <Text>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
                            <Text>{`${order?.billing.address_1}`}</Text>
                            <Text>{`${order?.billing.postcode} ${order?.billing.city}`}</Text>
                            <Text>{`${order?.billing.country}`}</Text>
                            <Text>{`${order?.billing.email}`}</Text>
                            <Text>{`${order?.billing.phone}`}</Text>
                        </View>
                        {order?.billing.company ? <View><Text>Dane Firmy:</Text>
                            <View>
                                <Text>{`${order?.billing.company}`}</Text>
                            </View></View> : <Text>Brak</Text>}
                    </Card>
                </View>

                <View>
                    <Card>
                        <Text>Zamówione produkty:</Text>
                        {order?.line_items.map(product => (
                            <SingleProductElementOfList product={product} key={product.id}/>
                        ))}
                    </Card>
                </View>

                <View>
                    <Card>
                        <Text>Płatność:</Text>
                        <PaymentInfo order={order}/>
                    </Card>
                </View>

                <View>
                    <Card>
                        <ShippingOrderInformation shipping={shipping} shippingTracking={shippingTracking}
                                                  key={order?.id} order={order}/>
                    </Card>
                </View>
            </ScrollView>
        </>
    );
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