import React, {useEffect, useState} from "react";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {CouponResponse} from "../../../interfaces/coupon.interface";
import Api from "../../../api/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {Loader} from "../../../components/Loader/Loader";
import {theme} from "../../../theme";
import {Appbar, Card, Divider, Text} from "react-native-paper";
import {RefreshControl, ScrollView, View} from "react-native";
import {checkDeviceFontSize} from "../../../helpers/checkDeviceFontSize";
import {couponTypeConverter, couponTypeIndicator} from "../../../helpers/couponTypeConverter";
import {checkCouponIsExpired} from "../../../helpers/checkCouponIsExpired";
import {dateConverter} from "../../../helpers/dateConverter";


interface SingleCouponProfileParams {
    couponId: number
}


export const SingleCouponProfileScreen = () => {
    const bigScreenSize = checkDeviceFontSize();

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, SingleCouponProfileParams>, string>>();

    const [coupon, setCoupon] = useState<CouponResponse | null>(null)
    const [loading, setLoading] = useState(true);
    const {couponId} = route.params;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [])

    const fetchData = async () => {
        try {
            const data = await Api.getOneCoupon(couponId);
            setCoupon(data)
            setLoading(false)
        } catch (e) {
            console.log('Error fetching coupon', e)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const handleRefreshCouponProfile = async () => {
        setRefreshing(true)
        await fetchData();
    }

    if (loading) {
        return (
            <SafeAreaView>
                <Loader title={'Wczytywanie szczegółowych danych kuponu'}/>
            </SafeAreaView>
        );
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const checkCouponCanBeUseWithAnotherCoupons = (value: boolean) => {
        switch (value) {
            case true:
                return 'Nie'
            default:
                return 'Tak'
        }
    }


    return(
        <>
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.BackAction onPress={handleGoBack}/>
                    <Appbar.Content title={`Kupon: ${coupon?.code}`}/>
                </Appbar.Header>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefreshCouponProfile}/>
                }>


                    <View style={{backgroundColor: theme.colors.background, padding: 10}}>
                        <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                                <Text variant='titleLarge'
                                      style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Szczegóły
                                    kuponu</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor}}>Typ:</Text>
                                <Text variant='bodyMedium'>{coupon?.discount_type && couponTypeConverter(coupon.discount_type)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor}}>Wartość: </Text>
                                <Text variant='bodyMedium'>{`${coupon?.amount}${coupon?.discount_type && couponTypeIndicator(coupon?.discount_type)}`}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor}}>Ważność: </Text>
                                <Text variant='bodyMedium' style={{color: theme.colors.primary}}>{`${coupon?.date_expires && checkCouponIsExpired(coupon?.date_expires)}`}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor, flexBasis: '60%', flexWrap: 'wrap'}}>Data wygaśnięcia kuponu: </Text>
                                <Text variant='bodyMedium'>{coupon?.date_expires && dateConverter(coupon.date_expires)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor}}>Ilość użyć: </Text>
                                <Text variant='bodyMedium' style={{color: theme.colors.primary}}>{coupon?.usage_count}</Text>
                            </View>
                        </Card>

                        <Card style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                                <Text variant='bodyMedium'
                                      style={{color: theme.colors.primary, fontFamily: 'OswaldRegular'}}>Ograniczenia</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor, flexBasis: '70%', flexWrap: 'wrap'}}>Można użyć z innymi kuponami: </Text>
                                <Text variant='bodyMedium'>{coupon?.individual_use && checkCouponCanBeUseWithAnotherCoupons(coupon.individual_use)}</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor, flexBasis: '70%', flexWrap: 'wrap'}}>Limit wykorzystania na użytkownika: </Text>
                                <Text variant='bodyMedium' >{coupon?.usage_limit_per_user}</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor, flexBasis: '70%', flexWrap: 'wrap'}}>Minimalna kwota zakupu: </Text>
                                <Text variant='bodyMedium' >{coupon?.minimum_amount}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text variant='bodyMedium' style={{color: theme.colors.appBarTitleColor, flexBasis: '70%', flexWrap: 'wrap'}}>Maksymalna kwota zakupu: </Text>
                                <Text variant='bodyMedium' >{coupon?.maximum_amount}</Text>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}