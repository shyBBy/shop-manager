import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Layout, Text} from "@ui-kitten/components";
import {CreateStoreScreenContainer} from "./CreateStoreScreen/CreateStoreScreen";
import {BasicStoreDetails} from "../../components/BasicStoreDetails/BasicStoreDetails";
import {ScrollView} from "react-native";

const Home: React.FC = (store: any) => {
    const {user} = useAuth();


    return (
        <>
            <Layout style={{paddingLeft: 10}}>
                {user?.store ? (
                    <Text category='h4'>{user.store?.name}</Text>
                ) : null}
            </Layout>
            <BasicStoreDetails/>
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
            <ScrollView>
                {userStore ? <Home/> : <CreateStoreScreenContainer/>}
            </ScrollView>
        </>
    );
};

export default HomeScreen;
