import React, {useEffect, useState} from "react";
import {Dimensions, Platform, StyleSheet, ToastAndroid, useWindowDimensions, View} from 'react-native';
import {useAuth} from "../../hooks/useAuth";
import {StorageManager} from "../../helpers/asyncStorage";
import {Appbar, Button, Surface, Text, TextInput} from "react-native-paper";
import {theme} from "../../theme";
import Api from "../../api/api";
import {GetListOfTopProductsResponse, GetOneSalesReportResponse} from "../../interfaces/reports.interfaces";
import {Loader} from "../Loader/Loader";
import {SingleTopProductsSalesElementOfList} from "./SingleTopProductsSalesElementOfList";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const image = require('../../../assets/img/myApp2.png');

export const BasicStoreDetails = () => {
    const {user} = useAuth();
    const [store, setStore] = useState<any>(null);
    const [salesReport, setSalesReport] = useState<GetOneSalesReportResponse | null>()
    const [topProductSalesReport, setTopProductSalesReport] = useState<GetListOfTopProductsResponse>([])
    const [loading, setLoading] = useState(true);

    const {width, height} = useWindowDimensions();
    // Pobierz szerokość ekranu
    const screenWidth = Dimensions.get('window').width;

    // Pobierz skale czcionki systemowej (współczynnik)
    const fontScale = Dimensions.get('window').fontScale;

    // Ustal rozmiar czcionki XL (przykładowo)
    const fontSizeXL = 20;

    // Oblicz rzeczywisty rozmiar czcionki, uwzględniając skalę
    const actualFontSize = fontSizeXL * fontScale;

    // Ustaw bigScreenSize na true, jeśli rzeczywisty rozmiar czcionki jest większy niż założony próg
    const bigScreenSize = actualFontSize > 20; // Możesz dostosować próg według swoich potrzeb


    //DATE PICKER STATES
    const [date, setDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [fromDate, setFromDate] = useState<any>('')
    const [toDate, setToDate] = useState<any>('')

    const toggleStartDatepicker = () => {
        setShowStartDatePicker(!showStartDatePicker)
    }

    const toggleEndDatepicker = () => {
        setShowEndDatePicker(!showEndDatePicker)
    }
    const onChangeStartDate = (props: any, selectedDate: any) => {
        const {type} = props
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)
            if (Platform.OS === 'android') {
                toggleStartDatepicker();
                setFromDate(currentDate.toISOString().slice(0, 10))
            }
        } else {
            toggleStartDatepicker();
        }
    }

    const onChangeEndDate = (props: any, selectedDate: any) => {
        const {type} = props
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)
            if (Platform.OS === 'android') {
                toggleEndDatepicker()
                setToDate(currentDate.toISOString().slice(0, 10))
            }
        } else {
            toggleEndDatepicker()
        }
    }

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
        fetchStore();
    }, [toDate]);

    const fetchStore = async () => {
        try {
            const storeData = await StorageManager.getObject('store');
            if (storeData) {
                setStore(storeData);
            }
        } catch (error) {
            console.error("Error fetching store", error);
        }
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const reportSalesRes = await Api.getSalesReport();
            setSalesReport(reportSalesRes);
            const topProductsSalesRes = await Api.getTopProductSalesReport();
            setTopProductSalesReport(topProductsSalesRes.slice(0, 5))
        } catch (error) {
            console.error("Error fetching refunds", error);
        } finally {
            setLoading(false);
        }
    };

    const {signOut} = useAuth();

    const handleSignOut = async () => {
        await signOut();
        ToastAndroid.show(`Pomyślnie wylogowano.`, ToastAndroid.LONG);
    };

    if (loading) {
        return <Loader title={'Wczytywanie statystyk'}/>;
    }

    return (
        <>
            <View style={{flex: 1}}>
                <Appbar.Header style={{backgroundColor: theme.colors.navigationBackground}}>

                    <Appbar.Content title={store ? store.name : 'Brak nazwy'}
                                    titleStyle={{color: theme.colors.appBarTitleColor, fontSize: bigScreenSize ? 14 : 22}}/>
                    <Button onPress={handleSignOut}>Wyloguj</Button>
                </Appbar.Header>
                {showStartDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChangeStartDate}
                    />
                )}
                {showEndDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChangeEndDate}
                    />
                )}
                <Text style={{marginLeft: 10, color: theme.colors.appBarTitleColor, fontFamily: 'BebasNeu', padding: 3, fontSize: bigScreenSize ? 14 : 18}}>Podstawowe statystyki sprzedaży</Text>
                <Text
                      style={{marginLeft: 10, color: theme.colors.onSurface, fontFamily: 'OswaldLight', fontSize: bigScreenSize ? 10 : 12}}>Statystyki od początku istnienia sklepu do dzisiaj.</Text>
                {/*<Text variant='bodySmall'*/}
                {/*      style={{marginLeft: 10, color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>Wybierz daty poniżej aby wyświetlić statystyki z wybranego okresu.</Text>*/}
                {/*<View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>*/}
                {/*    <Text variant='bodyMedium'*/}
                {/*          style={{marginLeft: 10, color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>{`Od: ${fromDate}`}</Text>*/}
                {/*    {fromDate === '' && (*/}
                {/*        <Button onPress={toggleStartDatepicker}>Wybierz początkową date</Button>*/}
                {/*    )}*/}
                {/*    <Text variant='bodyMedium'*/}
                {/*          style={{marginLeft: 10, color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>{`Do: ${toDate}`}</Text>*/}
                {/*    {toDate === '' && (*/}
                {/*        <TextInput*/}
                {/*            placeholder="Wybierz końcową datę"*/}
                {/*            autoCapitalize="none"*/}
                {/*            onChangeText={setToDate}*/}
                {/*            onPressIn={toggleEndDatepicker}*/}
                {/*            value={toDate}*/}
                {/*            mode='outlined'*/}
                {/*            style={{height: 30}}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</View>*/}
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={[styles.card, { height: bigScreenSize ? 90 : 80, width: bigScreenSize ? 180 : 170 }]}>
                            <View>
                                <Text  style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight', padding: 1, fontSize: bigScreenSize? 13 : 17}} >Łączna wartość zamówień</Text>
                            </View>
                            <View>
                                <Text  style={{color: theme.colors.primary, fontFamily: 'BebasNeu', padding: 1, fontSize: bigScreenSize? 12 : 16}} >{`${salesReport?.total_sales} zł`}</Text>
                            </View>
                        </View>
                        <View style={[styles.card, { height: bigScreenSize ? 90 : 80, width: bigScreenSize ? 180 : 170 }]}>
                            <View>
                                <Text  style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight', padding: 1, fontSize: bigScreenSize? 13 : 17}} >Ilość zamówień</Text>
                            </View>
                            <View>
                                <Text  style={{color: theme.colors.primary, fontFamily: 'BebasNeu', padding: 1, fontSize: bigScreenSize? 12 : 16}} >{`${salesReport?.total_orders}`}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={[styles.card, { height: bigScreenSize ? 90 : 80, width: bigScreenSize ? 180 : 170 }]}>
                            <View>
                                <Text  style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight', padding: 1, fontSize: bigScreenSize? 13 : 17}} >Ilość produktów</Text>
                            </View>
                            <View>
                                <Text  style={{color: theme.colors.primary, fontFamily: 'BebasNeu', padding: 1, fontSize: bigScreenSize? 12 : 16}} >{`${salesReport?.total_items}`}</Text>
                            </View>
                        </View>
                        <View style={[styles.card, { height: bigScreenSize ? 90 : 80, width: bigScreenSize ? 180 : 170 }]}>
                            <View>
                                <Text  style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight', padding: 1, fontSize: bigScreenSize? 13 : 17}} >Średnia wartość zamówienia</Text>
                            </View>
                            <View>
                                <Text  style={{color: theme.colors.primary, fontFamily: 'BebasNeu', padding: 1, fontSize: bigScreenSize? 12 : 16}} >{`${salesReport?.average_sales} zł`}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View>
                    <Text
                          style={{marginLeft: 10, color: theme.colors.appBarTitleColor, fontFamily: 'BebasNeu', padding: 3, fontSize: bigScreenSize ? 14 : 18}}>Top
                        5 najlepiej sprzedających się produktów</Text>
                    {topProductSalesReport.map((topProduct) => (
                        <SingleTopProductsSalesElementOfList product={topProduct} key={topProduct.product_id}/>
                    ))}
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    firstView: {
        backgroundColor: theme.colors.background, // Kolor tła dla pierwszego widoku
    },
    secondView: {
        backgroundColor: theme.colors.primary, // Kolor tła dla drugiego widoku
    },
    card: {
        // backgroundColor: theme.colors.navigationBackground,
        padding: 5,
        margin: 10,
        // alignItems: 'center',
        borderColor: theme.colors.navigationBackground,
        borderRadius: 5,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});