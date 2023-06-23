import React from "react";
import { Layout, Spinner } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const Loader = () => (
    <Layout style={styles.container}>
        <Spinner size="giant" />
    </Layout>
);


