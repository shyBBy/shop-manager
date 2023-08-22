import React, {useState} from "react";
import {Appbar, Button} from "react-native-paper";
import {ToastAndroid, View} from "react-native";
import {theme} from "../../theme";
import {useAuth} from "../../hooks/useAuth";
import {checkDeviceFontSize} from "../../helpers/checkDeviceFontSize";
import {NoStoreScreen} from "./NoStoreScreen/NoStoreScreen";
import {StoreInfo} from "./StoreInfo/StoreInfo";


export const YourStoreScreen = () => {
    const {user} = useAuth();
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const bigScreenSize = checkDeviceFontSize();

    const {signOut} = useAuth();

    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };

    // if (loading) {
    //     return <Loader title={'Wczytywanie...'}/>;
    // }

    return (
        <>
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.Content title={'Twój Sklep'} titleStyle={{color: theme.colors.appBarTitleColor}}/>
                    <Button onPress={handleSignOut}>Wyloguj</Button>
                </Appbar.Header>
                <NoStoreScreen/>
                {/*{user?.store ? <StoreInfo/> : <NoStoreScreen/>}*/}

            </View>
        </>
    )
}