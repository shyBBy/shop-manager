import React from "react";
import {Button, ListItem, Text} from "@ui-kitten/components";
import {getStatusColor, OrderStatusConverter} from "../../helpers/orderStatusConverter";
import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {ToastAndroid, View} from "react-native";
import {OrderStatusColor} from "../../interfaces/order.interfaces";
import { useNavigation } from "@react-navigation/native";
import {formatDate} from "../Utils/formatDate.utils";
import { TouchableOpacity } from "react-native-gesture-handler";


export const SingleOrderElementOfList = (props: any) => {
    const {order} = props
    const navigation = useNavigation();

    const showOrderProfileScreen = (orderId: number) => {
        const id = orderId.toString();
        // @ts-ignore
        navigation.navigate("SingleOrderProfile", { orderId: id });
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
                    <MaterialCommunityIcons  name="progress-clock" size={30}
                                            color={OrderStatusColor.PROCESSING}/>
                );
            case "in-transit":
                return (
                    <MaterialCommunityIcons  name="truck-fast-outline" size={30}
                                            color={OrderStatusColor.IN_TRANSIT}/>
                );
            case "completed":
                return <AntDesign  name="checkcircleo" size={30}
                                  color={OrderStatusColor.COMPLETED}/>;
            case "cancelled":
                return <Feather  name="x-circle" size={30} color={OrderStatusColor.CANCELLED}/>;
            default:
                return <Feather  name="box" size={30} color={OrderStatusColor.DEFAULT}/>;
        }
    };

    // onPress={() => showOrderProfileScreen(order.id)}
    return (
        <TouchableOpacity onPress={() => showOrderProfileScreen(order.id)}>
                <View style={{flexDirection: 'row', marginTop: 1, alignItems: 'center'}} >
                <View style={{flexBasis: 55}}>
                    {getOrderIcon(order.status)}
                </View>

                <View style={{flexBasis: 170, flexGrow: 2}}>
                    <Text>{formatDate(order.date_created)}</Text>
                    <View style={{ flexDirection: 'row', flexBasis: 170}}>
                        <Text style={{fontWeight: 'bold', marginRight: 10}}>{`#${order.id}`}</Text>
                        <Text>{`${order.billing.first_name} ${order.billing.last_name}`}</Text>
                    </View>
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
                </View>

                <Text>{`${order.total} zł`}</Text>
            </View>
        </TouchableOpacity>
    );
}