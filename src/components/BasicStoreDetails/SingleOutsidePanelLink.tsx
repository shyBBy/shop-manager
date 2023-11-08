import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {Linking, StyleSheet, View} from "react-native";
import {theme} from "../../theme";
import {Ionicons} from "@expo/vector-icons";

type IconName = "mail" | "cart" | "card" | "server" | "car" | "shield" | "key" /* dodaj więcej, jeśli potrzebujesz */;

export const SingleOutsidePanelLink = (props: any) => {

    const {card} = props;
    const handlePress = () => {
        // Otwórz link w przeglądarce zewnętrznej
        Linking.openURL(card.link);
    };

    return (
        <Card style={styles.card}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Ionicons name={card.icon as IconName} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.firstText}>{card.title}</Text>
                    <Text style={styles.secondText}>{card.description}</Text>
                </View>
                <Button onPress={handlePress} labelStyle={styles.buttonLabel}>
                    {card.button}
                </Button>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 12,
        borderRadius: 5,
        borderBottomColor: theme.colors.onSurface,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        marginRight: 7,
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
    },
    firstText: {
        fontSize: 16,
        color: theme.colors.appBarTitleColor,
    },
    secondText: {
        fontSize: 14,
        color: theme.colors.onSurface,
    },
    buttonLabel: {
        fontSize: 14,
        color: theme.colors.primary,
    },
});