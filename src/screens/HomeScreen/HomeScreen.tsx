import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Layout, Text} from "@ui-kitten/components";
import {CreateStoreScreenContainer} from "./CreateStoreScreen/CreateStoreScreen";

const Home: React.FC = () => {
    const {user} = useAuth();


    return (
        <>
            <Layout style={{paddingLeft: 10}}>
                <Text category='h4'>Nazwa sklepu</Text>
                {user?.email ? (
                    <Text>Email: {user.email}</Text>
                ) : (
                    <Text>Nie jesteś zalogowany</Text>
                )}

                {user?.store ? (
                    <Text>SKLEP: {user.store?.name}</Text>
                ) : (
                    <Text>Brak sklepu</Text>
                )}
            </Layout>
        </>
    );
}

const HomeScreen: React.FC = () => {
    const { user } = useAuth();
    const [userStore, setUserStore] = useState(user?.store);

    useEffect(() => {
        setUserStore(user?.store);
    }, [user]);

    return (
        <>
            {userStore ? <Home /> : <CreateStoreScreenContainer />}
        </>
    );
};

export default HomeScreen;
