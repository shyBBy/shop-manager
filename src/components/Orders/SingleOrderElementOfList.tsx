import React from "react";
import {getStatusColor, OrderStatusConverter} from "../../helpers/orderStatusConverter";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {formatDate} from "../Utils/formatDate.utils";
import {TouchableOpacity} from "react-native";
import {Button, Text, Card} from "react-native-paper";


export const SingleOrderElementOfList = (props: any) => {
    const {order} = props
    const navigation = useNavigation();

    const showOrderProfileScreen = (orderId: number) => {
        const id = orderId.toString();
        // @ts-ignore
        navigation.navigate("SingleOrderProfile", {orderId: id});
    };


    const statusColor = getStatusColor(order.status)

    const InstallButton = (): React.ReactElement => (
        <Button>
            {`${order.total} zł`}
        </Button>
    );

    return (
        // <TouchableOpacity onPress={() => showOrderProfileScreen(order.id)}>
        // @ts-ignore
        <TouchableOpacity onPress={() => navigation.navigate("SingleOrderProfile", {orderId: order.id})} >
            <Card>
            <View style={{flexDirection: 'row', marginTop: 1}}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 18}}>{formatDate(order.date_created)}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {`#${order.id}`}
                    </Text>
                    <Text style={{fontSize: 18}}>
                        {`${order.billing.first_name} ${order.billing.last_name}`}
                    </Text>
                    <View
                        style={{
                            backgroundColor: statusColor,
                            borderRadius: 4,
                            padding: 4,
                            alignSelf: 'flex-start',
                            marginTop: 4,
                        }}
                    >
                        <Text  style={{color: '#46494c', fontSize: 18}}>
                            {OrderStatusConverter(order.status)}
                        </Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>{`${order.total} zł`}</Text>
                </View>
            </View>
            </Card>
        </TouchableOpacity>


    );
}