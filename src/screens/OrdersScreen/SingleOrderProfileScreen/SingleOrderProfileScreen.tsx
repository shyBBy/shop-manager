import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {GetOneOrderResponse} from "../../../interfaces/order.interfaces";
import Api from "../../../api/api";
import {Loader} from "../../../components/Loader/Loader";
import {AntDesign} from '@expo/vector-icons';
import {RefreshControl, ScrollView, View} from "react-native";
import {formatDateWithYearAndHours} from "../../../components/Utils/formatDate.utils";
import {getStatusColor, OrderStatusConverter} from "../../../helpers/orderStatusConverter";
import {SingleProductElementOfList} from "../../../components/Orders/SingleProductElementOfList";
import {ShippingOrderInformation} from "../../../components/Orders/ShippingOrder/ShippingOrderInformation";
import {PaymentInfo} from "../../../components/Orders/Payment/PaymentInfo";

import {Appbar, Card, Text} from "react-native-paper";
import {theme} from "../../../theme";

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
        return <Loader title={'Wczytywanie szczegółowych danych zamówienia'}/>;
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                <Appbar.BackAction onPress={handleGoBack}/>
                <Appbar.Content title={`Zamówienie: ${orderId}`}/>
                {/*<Text style={{marginRight: 7}}>Max</Text>*/}
            </Appbar.Header>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefreshOrders}/>
            }>
                <View style={{backgroundColor: theme.colors.background, padding: 10}}>
                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
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

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                            <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Dane kupującego:</Text>
                            <View>
                                <Text variant='bodyMedium'>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
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
                        <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                            <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Dane Firmy:</Text>
                            <View>
                                <Text variant='bodyMedium'>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Text>
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

                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                        <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Zamówione produkty</Text>
                        {order?.line_items.map(product => (
                            <SingleProductElementOfList product={product} key={product.id}/>
                        ))}
                    </Card>

                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                        <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Płatność</Text>
                        <PaymentInfo order={order}/>
                    </Card>

                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                        <ShippingOrderInformation shipping={shipping} shippingTracking={shippingTracking} key={order?.id} order={order}/>
                    </Card>
                </View>
            </ScrollView>
        </>
    );
}


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     layoutContainer: {
//         width: '100%',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginHorizontal: 8,
//         padding: 10
//     },
//     backText: {
//         marginLeft: 8,
//         marginRight: 8,
//     },
//     orderTitle: {
//         marginLeft: 15,
//     },
// });