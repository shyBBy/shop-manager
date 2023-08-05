import React from "react";
import {getStatusColor, OrderStatusConverter} from "../../helpers/orderStatusConverter";
import {View, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {formatDate} from "../Utils/formatDate.utils";
import {TouchableOpacity} from "react-native";
import {Button, Text, Card, List, useTheme} from "react-native-paper";
import {theme} from "../../theme";



const TestComponent: React.FC = () => {
    return (
        <>
            <Text>TEST</Text>
        </>
    );
};

export const SingleOrderElementOfList = (props: any) => {
    const {order} = props
    const navigation = useNavigation();
    const theme = useTheme()

    const showOrderProfileScreen = (orderId: number) => {
        const id = orderId.toString();
        // @ts-ignore
        navigation.navigate("SingleOrderProfile", {orderId: id});
    };


    const statusColor = getStatusColor(order.status)

    return (
        // <TouchableOpacity onPress={() => showOrderProfileScreen(order.id)}>
        // @ts-ignore
        <TouchableOpacity onPress={() => navigation.navigate("SingleOrderProfile", {orderId: order.id})} >
            {/*<Card mode='elevated'>*/}
            {/*<View style={{flexDirection: 'row', marginTop: 1}}>*/}
            {/*    <View style={{flex: 1}}>*/}
            {/*        <Text style={{fontSize: 18}}>{formatDate(order.date_created)}</Text>*/}
            {/*        <Text style={{fontWeight: 'bold', fontSize: 18}}>*/}
            {/*            {`#${order.id}`}*/}
            {/*        </Text>*/}
            {/*        <Text style={{fontSize: 18}}>*/}
            {/*            {`${order.billing.first_name} ${order.billing.last_name}`}*/}
            {/*        </Text>*/}
            {/*        <View*/}
            {/*            style={{*/}
            {/*                backgroundColor: statusColor,*/}
            {/*                borderRadius: 4,*/}
            {/*                padding: 4,*/}
            {/*                alignSelf: 'flex-start',*/}
            {/*                marginTop: 4,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Text  style={{color: '#46494c', fontSize: 18}}>*/}
            {/*                {OrderStatusConverter(order.status)}*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>*/}
            {/*        <Text style={{fontSize: 18}}>{`${order.total} zł`}</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
            {/*</Card>*/}
            <Card style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.firstText}>{formatDate(order.date_created)}</Text>
                        <Text style={styles.firstText}>{`#${order.id} ${order.billing.first_name} ${order.billing.last_name}`}</Text>
                                <View
                                    style={{
                                        backgroundColor: statusColor,
                                        borderRadius: 3,
                                        padding: 4,
                                        alignSelf: 'flex-start',
                                        marginTop: 4,
                                    }}
                                >
                                    <Text style={{fontSize: 12, color: 'black'}}>
                                        {OrderStatusConverter(order.status)}
                                    </Text>
                                </View>
                    </View>
                    <Text style={styles.secondText}>{`${order.total} zł`}</Text>
                </View>
            </Card>
        </TouchableOpacity>


    );
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