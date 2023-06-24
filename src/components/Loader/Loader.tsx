import React from "react";
import {Layout, Spinner, Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const Loader = () => (
    <View style={styles.container}>
        <Spinner size="giant" status='info' />
        <Text>Wczytywanie listy zamówień</Text>
    </View>
);


