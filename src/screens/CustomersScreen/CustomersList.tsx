import React, {useEffect, useState} from "react";
import {Appbar, Menu, Text} from "react-native-paper";
import {RefreshControl, ScrollView, View} from "react-native";
import {theme} from "../../theme";
import {useNavigation} from "@react-navigation/native";
import {GetListOfCustomersResponse} from "../../interfaces/customer.interface";
import Api from "../../api/api";
import {useAuth} from "../../hooks/useAuth";
import {config} from "../../config/config";
import {Loader} from "../../components/Loader/Loader";
import {SingleCustomerElementOfList} from "../../components/Customers/SingleCustomerElementOfList";

export const CustomersList = () => {
    const [customerList, setCustomerList] = useState<GetListOfCustomersResponse>([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [loadingCustomers, setLoadingCustomers] = useState(false)
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [visible, setVisible] = React.useState(false);
    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);


const fetchData = async () => {
        try {
            setLoading(true);
            const customers = await Api.getAllCustomers(page, rowsPerPage);
            setCustomerList(customers);
        } catch (error) {
            console.error("Error fetching customers", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const handleRefreshCustomers = async () => {
        setRefreshing(true)
        await fetchData()
    };

    if (loading || loadingCustomers) {
        return <Loader title={"Wczytywanie listy klientów"}/>;
    }

    const handleResultsPerPageSelect = (value: any) => {
        setRowsPerPage(value);
        fetchData(); // Call fetchData() again to update the results based on the new value.
    };


    return(
        <>
            <View style={{backgroundColor: theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>
                    <Appbar.Content title={'Lista klientów'} titleStyle={{color: theme.colors.appBarTitleColor}}/>
                    <Menu
                        visible={visible}
                        onDismiss={hideMenu}
                        anchor={
                            <Appbar.Action icon="format-list-bulleted" onPress={showMenu}/>
                        }
                        style={{marginTop: 60}}
                    >
                        <Menu.Item onPress={() => handleResultsPerPageSelect(10)} title="10"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(20)} title="20"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(30)} title="30"/>
                        <Menu.Item onPress={() => handleResultsPerPageSelect(40)} title="40"/>
                    </Menu>
                    <Text style={{marginRight: 7}}>Max {rowsPerPage}</Text>
                </Appbar.Header>

                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefreshCustomers}/>
                    }
                >
                    {customerList.map((customer, index) => (
                        // <SingleCustomerElementOfList customer={customer} key={index}/>
                        <Text>KLIENT</Text>
                    ))}
                </ScrollView>

            </View>
        </>
    )
}