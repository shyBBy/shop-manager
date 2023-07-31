import React from 'react';
import {Text, View} from 'react-native';
import {RefundList} from "./RefundList";
import {ThemeOLD} from "../../themeOLD";


const RefundScreen: React.FC = () => {

    return (
        <>
            <View style={{backgroundColor: ThemeOLD.card.backgroundColor }}>
                <RefundList/>
            </View>
        </>
    );
};

export default RefundScreen;
