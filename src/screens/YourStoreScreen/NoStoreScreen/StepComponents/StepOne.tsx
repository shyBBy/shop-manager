import React from "react";
import {Card, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {theme} from "../../../../theme";
import {checkDeviceFontSize} from "../../../../helpers/checkDeviceFontSize";

export const StepOne = () => {
    const bigScreenSize = checkDeviceFontSize();
    return(
        <>
            <Card style={styles.card}>
                <Text variant='titleSmall'>Wygląda na to, że nie dodałeś swojego sklepu internetowego!</Text>
                <Text variant="bodySmall">Musisz zrobić to teraz aby korzystać z aplikacji, nie martw się - pokażemy Ci
                    jak to zrobić szybko i łatwo!</Text>
            </Card>
        </>
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