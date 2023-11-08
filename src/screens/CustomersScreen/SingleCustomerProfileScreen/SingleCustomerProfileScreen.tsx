import React from "react";
import {Card, Text, useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {formatDate} from "../../../components/Utils/formatDate.utils";
import {OrderStatusConverter} from "../../../helpers/orderStatusConverter";

export const SingleCustomerProfileScreen = (props: any) => {

    const {customer} = props;
    const navigation = useNavigation();
    const theme = useTheme()

    const showCustomerProfileScreen = (customerId: number) => {
        const id = customerId.toString();
        // @ts-ignore
        navigation.navigate("SingleCustomerProfile", {customerId: id});
    };

    return(
        // @ts-ignore
       <TouchableOpacity onPress={() => navigation.navigate("SingleCustomerProfile", {customerId: customer.id})}>
           <Card style={styles.card}>
               <View style={styles.container}>
                   <View style={styles.leftContainer}>
                       <Text style={styles.firstText}>{`${customer.name}`}</Text>
                       <Text style={styles.firstText}>{`23`}</Text>
                       <View
                           style={{
                               backgroundColor: 'red',
                               borderRadius: 3,
                               padding: 4,
                               alignSelf: 'flex-start',
                               marginTop: 4,
                           }}
                       >
                           <Text style={{fontSize: 12, color: 'black'}}>
                               status
                           </Text>
                       </View>
                   </View>
                   <Text style={styles.secondText}>{` zł`}</Text>
               </View>
           </Card>
       </TouchableOpacity>
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