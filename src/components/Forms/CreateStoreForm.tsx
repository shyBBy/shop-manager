import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {createStoreSchema} from "../../schemas/createStore.schema";
import Api from "../../api/api";
import {Text, Card, Button, TextInput} from "react-native-paper";
import React from "react";
import {KeyboardAvoidingView, ScrollView, View} from "react-native";
import {theme} from "../../theme";
import {HomeNavigationProp} from "../../interfaces/navigation.interfaces";
import {useNavigation} from "@react-navigation/native";

export const CreateStoreForm = () => {
    const {control, handleSubmit, formState: {errors}} = useForm<{ name: string; url: string; consumer_key: string; consumer_secret: string; }>({
        resolver: yupResolver(createStoreSchema),
    });

    const onSubmit = async (data: any) => {
        await Api.createStore(data, useNavigation<HomeNavigationProp>());
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={100}
                >
                    <View style={{marginLeft: 15, marginRight: 15}}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant='titleMedium'
                                          style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>Nazwa sklepu:</Text>
                                    <TextInput
                                        placeholder="Wpisz nazwę sklepu"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        style={{marginBottom: 10, width: 195, height: 35, fontSize: 12, textAlign: 'center'}}
                                        mode='flat'
                                    />
                                    {errors.name && <Text>{errors.name.message}</Text>}
                                </View>
                            )}
                            name="name"
                            defaultValue=""
                        />

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant='titleMedium'
                                          style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>Adres URL:</Text>
                                    <TextInput
                                        placeholder="https://nazwa.pl"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        style={{marginBottom: 10, width: 160, height: 35, fontSize: 12, textAlign: 'center'}}
                                        mode='flat'
                                    />
                                    {errors.url && <Text>{errors.url.message}</Text>}
                                </View>
                            )}
                            name="url"
                            defaultValue=""
                        />

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant='titleMedium'
                                          style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>Klucz klienta:</Text>
                                    <TextInput
                                        placeholder="Klucz klienta"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        style={{marginBottom: 10, width: 160, height: 35, fontSize: 12, textAlign: 'center'}}
                                        mode='flat'
                                    />
                                    {errors.consumer_key && <Text >{errors.consumer_key.message}</Text>}
                                </View>
                            )}
                            name="consumer_key"
                            defaultValue=""
                        />

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant='titleMedium'
                                          style={{color: theme.colors.onSurface, fontFamily: 'OswaldLight'}}>Klucz sekretny:</Text>
                                    <TextInput
                                        placeholder="Klucz sekretny"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        style={{marginBottom: 10, width: 160, height: 35, fontSize: 12, textAlign: 'center'}}
                                        mode='flat'
                                    />
                                    {errors.consumer_secret && <Text>{errors.consumer_secret.message}</Text>}
                                </View>
                            )}
                            name="consumer_secret"
                            defaultValue=""
                        />

                        <Button mode="outlined" onPress={handleSubmit(onSubmit)}>Utwórz sklep</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    );
}
