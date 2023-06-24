import {Feather} from "@expo/vector-icons";
import {View} from "react-native";

export const DefaultIcon = () => (
    <View style={{ paddingRight: 5 }}>
        <Feather name="help-circle" size={24} color="black" />
    </View>
);