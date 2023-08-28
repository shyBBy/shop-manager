import {StackNavigationProp} from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    Główna: undefined;
    Register: undefined;
    App: undefined;
    Coupons: undefined;
    CouponCreate: undefined;
    Activation: undefined;
    // Dodaj inne ekrany, jeśli są wymagane
};

export type LoginNavigationProp = StackNavigationProp<RootStackParamList,
    "Login">;

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,
    "Główna">;


export type RegisterNavigationProp = StackNavigationProp<RootStackParamList,
    "Register">;

export type HomeCouponNavigationProp = StackNavigationProp<RootStackParamList,
    "Coupons">;

export type CreateCouponNavigationProp = StackNavigationProp<RootStackParamList,
    "CouponCreate">;