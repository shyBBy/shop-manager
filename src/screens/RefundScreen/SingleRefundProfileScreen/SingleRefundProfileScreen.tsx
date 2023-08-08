import React, {useEffect, useState} from "react";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import Api from "../../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../../components/Loader/Loader";
import {RefreshControl, ScrollView, ToastAndroid, useWindowDimensions, View} from "react-native";
import {RefundRes} from "../../../interfaces/refund.interface";
import {Appbar, Card, Text, TextInput} from "react-native-paper";
import {theme} from "../../../theme";
import {useContext} from "react/index";
import {RemoveRefundAndOrderContext} from "../../../context/RemoveRefundAndOrderContext";
import {formatDate, formatDateWithYearAndHours} from "../../../components/Utils/formatDate.utils";


interface SingleRefundProfileParams {
    refundId: number;
}

export const SingleRefundProfileScreen = () => {
    const { width } = useWindowDimensions();
    const isNormalScreenSize = width <= 300;

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, SingleRefundProfileParams>, string>>();
    const [refund, setRefund] = useState<RefundRes | null>(null)
    const [loading, setLoading] = useState(true);
    const {refundId} = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const {setIsDeleting} = useContext(RemoveRefundAndOrderContext)
    const [text, setText] = useState('');

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            const data = await Api.getRefund(refundId);
            setRefund(data);
            setLoading(false);
        } catch (e) {
            console.error("Error fetching refunds", e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const handleRefreshRefundProfile = async () => {
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

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            // setIsUpdated((prevState) => !prevState);
            const res = await Api.deleteRefund(refundId)
            // @ts-ignore
            navigation.goBack();
        } catch (err) {
            console.error(err);
            ToastAndroid.show(`Jakiś problem`, ToastAndroid.SHORT)
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <>
            <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                <Appbar.BackAction onPress={handleGoBack}/>
                <Appbar.Content title={`Zamówienie: `}/>
                {/*<Text style={{marginRight: 7}}>Max</Text>*/}
                <Appbar.Action icon="delete" onPress={handleDelete}/>
            </Appbar.Header>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefreshRefundProfile}/>
            }>
                <View style={{backgroundColor: theme.colors.background, padding: 10}}>
                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                            <Text variant='titleLarge'
                                  style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Szczegóły
                                zwrotu</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>

                            <Text variant='bodyMedium'>{refund?.email}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Zamówienie
                                nr: </Text>
                            <Text variant='bodyMedium'>{refund?.orderId}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Produkt: </Text>
                            <Text variant='bodyMedium'>{refund?.productTitle}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Kod
                                produktu: </Text>
                            <Text variant='bodyMedium'>{refund?.productCode}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Status
                                zwrotu: </Text>
                            <Text variant='bodyMedium'>{refund?.status}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Data utworzenia
                                zwrotu: </Text>
                            <Text variant='bodyMedium'>{formatDate(refund?.createdAt)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Ostatnia
                                aktualizacja: </Text>
                            <Text variant='bodyMedium'>{formatDate(refund?.updatedAt)}</Text>
                        </View>
                        <View style={{flexDirection: isNormalScreenSize ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Przyczyna
                                zwrotu: </Text>
                            <Text variant='bodyMedium'>{refund?.reason}</Text>
                        </View>
                    </Card>

                    <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                        <View>
                            <Text variant='titleMedium' style={{color: theme.colors.appBarTitleColor}}>Opis
                                zwrotu</Text>
                            <Text>{refund?.description}</Text>
                        </View>
                    </Card>

                    <View>
                        <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                                <Text variant='titleLarge'
                                      style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Zarzadzaj
                                    zwrotem</Text>
                            </View>
                            <View>
                                <TextInput
                                    label="Dodaj odpowiedź"
                                    value={text}
                                    mode='outlined'
                                    onChangeText={setText}
                                    multiline
                                    numberOfLines={4} // Możesz określić liczbę widocznych wierszy (opcjonalne)
                                    style={{height: 220, textAlignVertical: 'top'}} // Ustaw wysokość obszaru tekstowego
                                />
                            </View>
                        </Card>
                    </View>
                </View>
            </ScrollView>

        </>
    )
}
