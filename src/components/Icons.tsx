import {AntDesign, Feather, MaterialCommunityIcons} from "@expo/vector-icons";

export const getOrderIcon = (status: string): React.ReactElement => {
    switch (status) {
        case "processing":
            return (
                <MaterialCommunityIcons name="progress-clock" size={24} color="black" />
            );
        case "in-transit":
            return (
                <MaterialCommunityIcons name="truck-fast-outline" size={24} color="black" />
            );
        case "completed":
            return <AntDesign name="checkcircleo" size={24} color="black" />;
        case "cancelled":
            return <Feather name="x-circle" size={24} color="black" />;
        default:
            return <Feather name="box" size={24} color="black" />;
    }
};