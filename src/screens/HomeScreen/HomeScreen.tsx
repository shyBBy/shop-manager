import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {CreateStoreScreenContainer} from "./CreateStoreScreen/CreateStoreScreen";
import {BasicStoreDetails} from "../../components/BasicStoreDetails/BasicStoreDetails";
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Home: React.FC = (store: any) => {
    const {user} = useAuth();


    return (
        <>
            <SafeAreaView/>
            <ScrollView>
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
