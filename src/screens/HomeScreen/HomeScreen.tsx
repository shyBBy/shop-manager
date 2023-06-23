import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Layout, Text} from "@ui-kitten/components";
import {CreateStoreScreenContainer} from "./CreateStoreScreen/CreateStoreScreen";
import {BasicStoreDetails} from "../../components/BasicStoreDetails/BasicStoreDetails";

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
            {userStore ? <Home/> : <CreateStoreScreenContainer/>}
        </>
    );
};

export default HomeScreen;
