import React from "react";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {View} from "react-native";
import {Card, Text} from "react-native-paper";

export const SingleRefundElementOfList = (props: any) => {
    const {refund} = props
    const navigation = useNavigation();

    const showRefundProfileScreen = (refundId: number) => {
        const id = refundId.toString();
        // @ts-ignore
        navigation.navigate("SingleRefundProfile", {refundId: id});
    };

    return (
        <>
            <TouchableOpacity onPress={() => showRefundProfileScreen(refund.uuid)}>
                <Card>
                <View style={{flexDirection: 'row', marginTop: 1}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            {`Nr zamówienia: ${refund.orderId}`}
                        </Text>
                        <Text style={{fontSize: 18}}>
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
                            <Text style={{color: '#46494c', fontSize: 18}}>
                                {refund.reason}
                            </Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18}}>{refund.status}</Text>
                    </View>
                </View>
                </Card>
            </TouchableOpacity>
        </>
    )
}