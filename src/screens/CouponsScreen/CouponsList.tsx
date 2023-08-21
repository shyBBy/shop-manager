import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import Api from "../../api/api";
import {Loader} from "../../components/Loader/Loader";
import {GetListOfAllCouponsResponse} from "../../interfaces/coupon.interface";
import {RefreshControl, ScrollView} from "react-native";
import {Text} from "react-native-paper";
import {SingleCouponElementOfList} from "../../components/Coupons/SingleCouponElementOfList";


export const CouponsList = () => {
    const [couponsList, setCouponsList] = useState<GetListOfAllCouponsResponse>([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const coupons = await Api.getAllCoupons()
            setCouponsList(coupons);
        } catch (error) {
            console.error("Error fetching coupons", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefreshCouponsList = async () => {
        setRefreshing(true);
        await fetchData();
    }


    if (loading) {
        return <Loader title={"Wczytywanie listy kuponów"}/>
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefreshCouponsList}/>
            }
        >
            {couponsList.map((coupon) => (
                <SingleCouponElementOfList coupon={coupon} key={coupon.id}/>
            ))}
        </ScrollView>
    )
}