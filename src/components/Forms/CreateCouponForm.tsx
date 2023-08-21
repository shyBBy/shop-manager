import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import Api from "../../api/api";
import {createCouponSchema} from "../../schemas/createCoupon.schema";
import {View} from "react-native";
import {Button, Switch, Text, TextInput,} from "react-native-paper";
import {Picker} from '@react-native-picker/picker';
import {theme} from "../../theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation} from "@react-navigation/native";
import {HomeCouponNavigationProp} from "../../interfaces/navigation.interfaces";

export const CreateCouponForm = () => {

    //DATE PICKER STATES
    const [date, setDate] = useState(new Date());
    const [showExpiresDatePicker, setShowExpiresDatePicker] = useState(false);
    const [expiresDate, setExpiresDate] = useState<any>('')

    const toggleStartDatepicker = () => {
        setShowExpiresDatePicker(!showExpiresDatePicker)
    }

    // const onChangeExpiresDate = (props: any, selectedDate: any) => {
    //     const {type} = props
    //     if (type == "set") {
    //         const currentDate = selectedDate;
    //         setDate(currentDate)
    //         if (Platform.OS === 'android') {
    //             toggleStartDatepicker();
    //             setExpiresDate(currentDate.toISOString().slice(0, 10))
    //         }
    //     } else {
    //         toggleStartDatepicker();
    //     }
    // }

    const onChangeExpiresDate = (event: any, selectedDate: any) => {
        if (selectedDate) {
            toggleStartDatepicker();
            const formattedDate = selectedDate.toISOString().slice(0, 10);
            setExpiresDate(formattedDate);
        } else {
            toggleStartDatepicker();
        }
    };

    const {control, handleSubmit, formState: {errors}} = useForm<{
        code: string;
        discount_type: string;
        description?: string | undefined;
        date_expires: string;
        individual_use: boolean;
        usage_limit_per_user: number;
        amount: string;
        exclude_sale_items: boolean;
        minimum_amount?: string | undefined;
    }>({
        resolver: yupResolver(createCouponSchema),
    });


    const onSubmit = async (data: any) => {
        await Api.createCoupon(data); // Przekazanie nawigacji do createCoupon
        console.log(data);
    }

    return (
        <>

            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text variant='titleMedium'
                              style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Kod:</Text>
                        <TextInput
                            placeholder="Przykładowo LATO23"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{marginBottom: 10}}
                            mode='outlined'
                        />
                        {errors.code && <Text style={{color: 'red'}}>{errors.code.message}</Text>}
                    </View>
                )}
                name="code"
                defaultValue=""
            />
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Typ
                            kuponu:</Text>
                        <View style={{
                            borderStyle: 'solid',
                            borderColor: theme.colors.outline,
                            borderWidth: 1,
                            borderRadius: 3,
                            marginTop: 10,
                            marginBottom: 10,
                            backgroundColor: theme.colors.background
                        }}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                dropdownIconColor={theme.colors.primary}
                                style={{marginBottom: 10, width: 220, height: 40}}
                            >
                                <Picker.Item
                                    style={{color: theme.colors.onSurface, backgroundColor: theme.colors.background}}
                                    label="Wybierz typ z listy" value=""/>
                                <Picker.Item
                                    style={{color: theme.colors.onSurface, backgroundColor: theme.colors.background}}
                                    label="Procentowy rabat" value="percent"/>
                                <Picker.Item
                                    style={{color: theme.colors.onSurface, backgroundColor: theme.colors.background}}
                                    label="Kwotowy rabat na koszyk" value="fixed_cart"/>
                                <Picker.Item
                                    style={{color: theme.colors.onSurface, backgroundColor: theme.colors.background}}
                                    label="Kwotowy rabat na produkt" value="fixed_product"/>
                            </Picker>
                        </View>
                        {errors.discount_type && <Text style={{color: 'red'}}>{errors.discount_type.message}</Text>}
                    </View>
                )}
                name="discount_type"
                defaultValue=""
            />
            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({field: {onChange, onBlur, value}}) => (*/}
            {/*        <View>*/}
            {/*            <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Opis:</Text>*/}
            {/*            <TextInput*/}
            {/*                placeholder="może być puste"*/}
            {/*                keyboardType="default"*/}
            {/*                autoCapitalize="none"*/}
            {/*                onChangeText={onChange}*/}
            {/*                onBlur={onBlur}*/}
            {/*                value={value}*/}
            {/*                style={{marginBottom: 10}}*/}
            {/*                mode='outlined'*/}
            {/*            />*/}
            {/*            {errors.description && <Text style={{color: 'red'}}>{errors.description.message}</Text>}*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*    name="description"*/}
            {/*    defaultValue=""*/}
            {/*/>*/}


            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Data
                            ważności:</Text>
                        <TextInput
                            placeholder="Wybierz datę ważności"
                            keyboardType="default"
                            autoCapitalize="none"
                            onFocus={() => {
                                toggleStartDatepicker();
                                onBlur(); // Dodaj tę linię, aby wywołać onBlur i zaktualizować pole
                            }}
                            value={value} // Ustawiamy wartość pola z hook form
                            style={{marginBottom: 10, width: 200, height: 40}}
                            mode="outlined"
                            onChangeText={onChange}
                        />
                        {showExpiresDatePicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={value ? new Date(value) : new Date()} // Wartość z hook form lub domyślna
                                onChange={(event, selectedDate) => {
                                    toggleStartDatepicker();
                                    if (selectedDate) {
                                        onChange(selectedDate.toISOString().slice(0, 10)); // Aktualizacja wartości przez hook form
                                    }
                                }}
                            />
                        )}
                    </View>
                )}
                name="date_expires"
                defaultValue=""
            />
            {/*{errors.date_expires && <Text style={{ color: 'red' }}>{errors.date_expires.message}</Text>}*/}
            {/*{showExpiresDatePicker && (*/}
            {/*    <DateTimePicker*/}
            {/*        mode="date"*/}
            {/*        display="spinner"*/}
            {/*        value={expiresDate ? new Date(expiresDate) : new Date()}*/}
            {/*        onChange={onChangeExpiresDate}*/}
            {/*    />*/}
            {/*)}*/}
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Ilość
                            użyć na użytkownika:</Text>
                        <TextInput
                            placeholder={value !== undefined ? '' : 'Podaj liczbe'}
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={(text) => onChange(parseInt(text))}
                            onBlur={onBlur}
                            value={value !== undefined ? value.toString() : ''}
                            style={{marginBottom: 10, width: 130, height: 40}}
                            mode='outlined'
                        />
                        {errors.usage_limit_per_user &&
                            <Text style={{color: 'red'}}>{errors.usage_limit_per_user.message}</Text>}
                    </View>
                )}
                name="usage_limit_per_user"
            />
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text variant='titleMedium'
                              style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Wartość:</Text>
                        <TextInput
                            placeholder="10.00"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{marginBottom: 10, width: 130, height: 40}}
                            mode='outlined'
                        />
                        {errors.amount && <Text style={{color: 'red'}}>{errors.amount.message}</Text>}
                    </View>
                )}
                name="amount"
                defaultValue=""
            />
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Minimalna
                            kwota:</Text>
                        <TextInput
                            placeholder="Domyślnie 0.00"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{marginBottom: 10, width: 130, height: 40}}
                            mode='outlined'
                        />
                        {errors.minimum_amount && <Text style={{color: 'red'}}>{errors.minimum_amount.message}</Text>}
                    </View>
                )}
                name="minimum_amount"
                defaultValue="00.00"
            />
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Można
                            użyć z innymi kuponami:</Text>
                        <Switch
                            value={value} // value będzie true lub false
                            onValueChange={onChange} // onValueChange wywoływane przy zmianie wartości switcha
                        />
                        {errors.individual_use && <Text style={{color: 'red'}}>{errors.individual_use.message}</Text>}
                    </View>
                )}
                name="individual_use"
                defaultValue={false}
            />


            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text variant='titleMedium' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Można
                            użyć na produktach przecenionych:</Text>
                        <Switch
                            value={value} // value będzie true lub false
                            onValueChange={onChange} // onValueChange wywoływane przy zmianie wartości switcha
                        />
                        {errors.exclude_sale_items &&
                            <Text style={{color: 'red'}}>{errors.exclude_sale_items.message}</Text>}
                    </View>
                )}
                name="exclude_sale_items"
                defaultValue={false}
            />

            <View style={{alignItems: 'center', padding: 10}}>
                <Button onPress={handleSubmit(onSubmit)} mode="contained">Stwórz</Button>
            </View>
        </>
    )
}