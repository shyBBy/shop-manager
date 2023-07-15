import React, {useEffect, useState} from "react";
import {Card, Layout, Text} from "@ui-kitten/components";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {GetOneOrderResponse} from "../../../interfaces/order.interfaces";
import Api from "../../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../../components/Loader/Loader";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {ScrollView, StyleSheet, View} from "react-native";
import {formatDateWithYearAndHours} from "../../../components/Utils/formatDate.utils";
import {getStatusColor, OrderStatusConverter} from "../../../helpers/orderStatusConverter";
import {SingleProductElementOfList} from "../../../components/Orders/SingleProductElementOfList";
import {ShippingOrderInformation} from "../../../components/Orders/ShippingOrder/ShippingOrderInformation";
import {PaymentInfo} from "../../../components/Orders/Payment/PaymentInfo";
import {Test} from "./Test";

interface SingleOrderProfileParams {
    orderId: number;
}


export const SingleOrderProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, SingleOrderProfileParams>, string>>();
    const [order, setOrder] = useState<GetOneOrderResponse | null>(null)
    const [shipping, setShipping] = useState<any>(null)
    const [shippingTracking, setShippingTracking] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const {orderId} = route.params;


    useEffect(() => {
        (async () => {
            const data = await Api.getOrder(orderId);
            setOrder(data.order);
            setShipping(data.shipping)
            // console.log(data)
            setShippingTracking(data.shipping_tracking)
            setLoading(false);
            // console.log(`data`, data)
            // console.log(`order`, data.order)
            // console.log(`shipping`, data.shipping)
            // console.log(`tracking`, data.shipping_tracking)
        })();
    }, []);

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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Layout style={styles.layoutContainer}>
                    <View style={styles.header}>
                        <Ionicons name="arrow-back" size={27} color="black" onPress={handleGoBack}/>
                        <Text style={styles.orderTitle} category='h5'>Zamówienie: #{orderId}</Text>
                    </View>
                </Layout>

                <Layout>
                    <Card>
                        <Text>{formatDateWithYearAndHours(order?.date_created)}</Text>
                        <Text category='h5'>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{
                                backgroundColor: getStatusColor(order?.status),
                                borderRadius: 4,
                                padding: 4,
                                alignSelf: 'flex-start',
                                marginTop: 4,
                            }}>
                                <Text category="s2" style={{color: '#46494c', flexGrow: 1}}>
                                    {OrderStatusConverter(order?.status)}
                                </Text>
                            </View>
                            <AntDesign name="edit" size={24} color="black"/>
                        </View>
                    </Card>
                </Layout>

                <Layout>
                    <Card>
                        <Text category='h6'>Dane kupującego:</Text>
                        <View>
                            <Text>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
                            <Text>{`${order?.billing.address_1}`}</Text>
                            <Text>{`${order?.billing.postcode} ${order?.billing.city}`}</Text>
                            <Text>{`${order?.billing.country}`}</Text>
                            <Text>{`${order?.billing.email}`}</Text>
                            <Text>{`${order?.billing.phone}`}</Text>
                        </View>
                        {order?.billing.company ? <View><Text category='h6'>Dane Firmy:</Text>
                            <View>
                                <Text>{`${order?.billing.company}`}</Text>
                            </View></View> : <Text>Brak</Text>}
                    </Card>
                </Layout>

                <Layout>
                    <Card>
                        <Text category='h6'>Zamówione produkty:</Text>
                        {order?.line_items.map(product => (
                            <SingleProductElementOfList product={product} key={product.id}/>
                        ))}
                    </Card>
                </Layout>

                <Layout>
                    <Card>
                        <Text category='h6'>Płatność:</Text>
                        <PaymentInfo order={order}/>
                    </Card>
                </Layout>

                <Layout>
                    <Card>
                        <ShippingOrderInformation shipping={shipping} shippingTracking={shippingTracking} key={order?.id} order={order}/>
                    </Card>
                </Layout>
            </ScrollView>
        </SafeAreaView>
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