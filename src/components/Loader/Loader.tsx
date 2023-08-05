import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import { ActivityIndicator} from 'react-native-paper';
import {Colors} from "react-native/Libraries/NewAppScreen";
import {theme} from "../../theme";

export const Loader = (props: any) => {
    const {title} = props;

    return(

        <View style={{backgroundColor: theme.colors.background, width: `100%`, height: `100%`}}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '100%', flexDirection: 'column'}}>
                <ActivityIndicator animating={true} color={Colors.red800} />
                {title? <Text>{`${title}`}</Text> : null}
            </View>
        </View>
    )
}




