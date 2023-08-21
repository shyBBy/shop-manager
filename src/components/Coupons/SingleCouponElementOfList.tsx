import React from "react";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";
import {couponTypeConverter, couponTypeIndicator} from "../../helpers/couponTypeConverter";
import {theme} from "../../theme";
import Api from "../../api/api";
import {checkCouponIsExpired} from "../../helpers/checkCouponIsExpired";

export const SingleCouponElementOfList = (props: any) => {

    const {coupon} = props
    const navigation = useNavigation();

    const showCouponProfileScreen = (couponId: number) => {
        const id = couponId.toString();
        // @ts-ignore
        navigation.navigate("SingleCouponProfile", {couponId: id});
    };

    return (
        <>
            <TouchableOpacity onPress={() => showCouponProfileScreen(coupon.id)}>
                <Card style={styles.card}>
                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Text style={{color: theme.colors.onPrimary}} variant='titleMedium'>{coupon.code}</Text>
                            <Text style={{fontSize: 12, color: theme.colors.onSurface}}>
                                {`${couponTypeConverter(coupon.discount_type)} o wartości ${coupon.amount}${couponTypeIndicator(coupon.discount_type)}`}
                            </Text>
                            <View
                                style={{
                                    backgroundColor: theme.colors.navigationBackground,
                                    borderRadius: 3,
                                    padding: 4,
                                    alignSelf: 'flex-start',
                                    marginTop: 4,
                                }}
                            >
                                <Text style={{fontSize: 12, color: theme.colors.onSurface}}>
                                    {checkCouponIsExpired(coupon.date_expires)}
                                </Text>
                            </View>
                        </View>
                        <Button onPress={() => (Api.removeCoupon(coupon.id))} icon='delete'>{''}</Button>
                    </View>
                </Card>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 12,
        borderRadius: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'column',
    },
});