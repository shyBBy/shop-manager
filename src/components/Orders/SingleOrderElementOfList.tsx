import React from "react";
import {Button, ListItem, Text} from "@ui-kitten/components";
import {getStatusColor, OrderStatusConverter} from "../../helpers/orderStatusConverter";
import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {ToastAndroid, View} from "react-native";
import {OrderStatusColor} from "../../interfaces/order.interfaces";
import { useNavigation } from "@react-navigation/native";


export const SingleOrderElementOfList = (props: any) => {
    const {order} = props
    const navigation = useNavigation();

    const showOrderProfileScreen = (orderId: number) => {
        const id = orderId.toString();
        // @ts-ignore
        navigation.navigate("SingleOrderProfile", { orderId: id });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", {month: "short"});
        return `${day} ${month}`;
    };
    const statusColor = getStatusColor(order.status)

    const InstallButton = (): React.ReactElement => (
        <Button size='small' appearance='outline' status='basic'>
            {`${order.total} zł`}
        </Button>
    );

    const getOrderIcon = (status: string): React.ReactElement => {
        switch (status) {
            case "processing":
                return (
                    <MaterialCommunityIcons style={{marginRight: 5}} name="progress-clock" size={30}
                                            color={OrderStatusColor.PROCESSING}/>
                );
            case "in-transit":
                return (
                    <MaterialCommunityIcons style={{marginRight: 5}} name="truck-fast-outline" size={30}
                                            color={OrderStatusColor.IN_TRANSIT}/>
                );
            case "completed":
                return <AntDesign style={{marginRight: 5}} name="checkcircleo" size={30}
                                  color={OrderStatusColor.COMPLETED}/>;
            case "cancelled":
                return <Feather style={{marginRight: 5}} name="x-circle" size={30} color={OrderStatusColor.CANCELLED}/>;
            default:
                return <Feather style={{marginRight: 5}} name="box" size={30} color={OrderStatusColor.DEFAULT}/>;
        }
    };

    const ClientData = (): React.ReactElement => (
        <>
            <Text>{`${order.billing.first_name} ${order.billing.last_name}`}</Text>
            <View style={{
                backgroundColor: statusColor,
                borderRadius: 4,
                padding: 4,
                alignSelf: 'flex-start',
                marginTop: 4,
            }}>
                <Text category="s2" style={{color: '#46494c'}}>
                    {OrderStatusConverter(order.status)}
                </Text>
            </View>
        </>
    )


    const OrderDateAndNumber = (): React.ReactElement => (
        <>
            <Text>{formatDate(order.date_created)}</Text>
            <Text style={{fontWeight: 'bold'}}>{`#${order.id}`}</Text>
        </>
    )

    return (
        <ListItem
            title={<OrderDateAndNumber/>}
            description={<ClientData/>}
            accessoryLeft={() => getOrderIcon(order.status)}
            accessoryRight={InstallButton}
            style={{marginBottom: 5, marginTop: 5}}
            onPress={() => showOrderProfileScreen(order.id)}
        />
    );
}