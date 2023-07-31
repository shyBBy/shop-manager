import React from 'react';
import {Text, View} from 'react-native';
import {RefundList} from "./RefundList";
import {Theme} from "../../theme";


const RefundScreen: React.FC = () => {

    return (
        <>
            <View style={{backgroundColor: Theme.card.backgroundColor }}>
                <RefundList/>
            </View>
        </>
    );
};

export default RefundScreen;
