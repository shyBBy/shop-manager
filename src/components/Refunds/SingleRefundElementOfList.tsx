import React from "react";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";

export const SingleRefundElementOfList = (props: any) => {
    const {refund} = props
    const navigation = useNavigation();

    const showRefundProfileScreen = (refundId: number) => {
        const id = refundId.toString();
        // @ts-ignore
        navigation.navigate("SingleRefundProfile", {refundId: id});
    };

    const {width, height} = useWindowDimensions();
    const fontSize = width < 300 ? 9 : 13;

    return (
        <>
            <TouchableOpacity onPress={() => showRefundProfileScreen(refund.uuid)}>
                <Card style={styles.card}>
                <View style={{flexDirection: 'row', marginTop: 1}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: 'bold', fontSize: fontSize}}>
                            {`Nr zamówienia: ${refund.orderId}`}
                        </Text>
                        <Text style={{fontSize: fontSize}}>
                            {refund.email}
                        </Text>
                        <View
                            style={{
                                borderRadius: 4,
                                padding: 4,
                                alignSelf: 'flex-start',
                                marginTop: 4,
                            }}
                        >
                            <Text style={{color: '#46494c', fontSize: fontSize}}>
                                {refund.reason}
                            </Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', justifyContent: 'center', marginRight: 7}}>
                    </View>
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
    firstText: {
        fontSize: 16,
    },
    secondText: {
        fontSize: 16,
    },
});