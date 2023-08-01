import React from "react";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import Svg, {Path} from "react-native-svg";
import {Text} from "react-native-paper";

export const CustomTabBarButton = (props: any) => {
    const {route, children, accessibilityState, onPress} = props;
    return(
        <>
            <Text>{}</Text>
        </>
    )
};

const styles = StyleSheet.create({
    btnWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    activeBtn: {
        flex: 1,
        top: -22,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
    },
    inactiveBtn: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgGapFiller: {
        flex: 1,
        backgroundColor: 'orange',
    },
});