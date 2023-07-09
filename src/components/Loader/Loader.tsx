import React from "react";
import {Spinner, Text} from "@ui-kitten/components";
import {View} from "react-native";


export const Loader = (props: any) => {
    const {title} = props;

    return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '100%', flexDirection: 'column'}}>
            <Spinner size="giant" status='info'/>
            {title? <Text>{`${title}`}</Text> : null}
        </View>
    )
}




