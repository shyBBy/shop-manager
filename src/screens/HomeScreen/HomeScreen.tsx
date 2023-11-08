import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {CreateStoreScreenContainer} from "./CreateStoreScreen/CreateStoreScreen";
import {BasicStoreDetails} from "../../components/BasicStoreDetails/BasicStoreDetails";
import {Platform, ScrollView} from "react-native";

import {useTheme} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WpLoginScreen} from "../WpLoginScreen/WpLoginScreen";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Home: React.FC = (store: any) => {

    const theme = useTheme()


    return (
        <>
            <ScrollView style={{backgroundColor: theme.colors.background}}>
                <BasicStoreDetails/>
            </ScrollView>
        </>
    );
}

const HomeScreen: React.FC = () => {
    const {user} = useAuth();
    const [userStore, setUserStore] = useState(user?.store);

    useEffect(() => {
        setUserStore(user?.store);
    }, [user]);

    return (
        <>
            {userStore ? <Home/> : <CreateStoreScreenContainer/>}
        </>
    );
};

export default HomeScreen;
