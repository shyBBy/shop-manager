import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Card, Text, useTheme} from "react-native-paper";
import {theme} from "../../theme";

export const SingleTopProductsSalesElementOfList = (props: any) => {
    const {product} = props

    const theme = useTheme()
    return (
        <Card style={styles.card}>
            <View style={styles.container}>
                <Image source={{uri: product.image.url}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.firstText}>{product.name}</Text>
                    <Text style={styles.secondText}>{product.quantity}</Text>
                </View>
            </View>
        </Card>
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
        borderBottomColor: theme.colors.primary,
        borderStyle: 'solid',
        borderWidth: 1
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 7,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    firstText: {
        fontSize: 16,
        flex: 1,
        paddingRight: 10,
    },
    quantityContainer: {
        minWidth: 50, // Ustawiona stała szerokość dla obszaru ilości sprzedaży
    },
    secondText: {
        fontSize: 16,
        color: theme.colors.primary,
    },
});

