import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type OrdersStackParamList = {
    OrdersList: undefined;
    OrderDetails: {orderId: any}
}

export type OrdersListScreenNavigationProp = StackNavigationProp<OrdersStackParamList, 'OrdersList'>
export type OrdersListScreenRouteProp = RouteProp<OrdersStackParamList, 'OrdersList'>

export type OrderDetailsScreenNavigationProp = StackNavigationProp<OrdersStackParamList, 'OrderDetails'>
export type OrderDetailsScreenRouteProp = RouteProp<OrdersStackParamList, 'OrderDetails'>;