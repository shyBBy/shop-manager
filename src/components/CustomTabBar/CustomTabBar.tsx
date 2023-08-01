import React from "react";
import {View, StyleSheet} from "react-native";
import {BottomTabBar} from "@react-navigation/bottom-tabs";

export const CustomTabBar = (props: any) => {
    return(
        <View>
            <View style={styles.tabBar} />
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'blue',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
    },
});