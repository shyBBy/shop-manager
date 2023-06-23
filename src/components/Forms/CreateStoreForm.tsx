import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {createStoreSchema} from "../../schemas/createStore.schema";
import Api from "../../api/api";
import {Button, Card, Input, Text} from '@ui-kitten/components';
import React from "react";

export const CreateStoreForm = () => {
    const {control, handleSubmit, formState: {errors}} = useForm<{ name: string; url: string; consumer_key: string; consumer_secret: string; }>({
        resolver: yupResolver(createStoreSchema),
    });

    const onSubmit = async (data: any) => {
       await Api.createStore(data)
    }

    return (
        <>
            <Card style={{marginBottom: 30, borderColor: 'orange', borderWidth: 1}}>
                <Text category="h6" style={{ marginBottom: 6 }}>Adres URL sklepu!</Text>
                <Text>
                    Pamiętaj o poprawnym ustawieniu adresu URL - "https://nazwa.pl" bez ukośnika na końcu.
                </Text>
            </Card>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Nazwa sklepu</Text>
                        <Input
                            placeholder="Wpisz nazwę sklepu"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                        />
                        {errors.name && <Text status="danger">{errors.name.message}</Text>}
                    </>
                )}
                name="name"
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Adres URL</Text>
                        <Input
                            placeholder="https://nazwa.pl"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                        />
                        {errors.url && <Text status="danger">{errors.url.message}</Text>}
                    </>
                )}
                name="url"
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Klucz klienta</Text>
                        <Input
                            placeholder="Klucz klienta"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                        />
                        {errors.consumer_key && <Text status="danger">{errors.consumer_key.message}</Text>}
                    </>
                )}
                name="consumer_key"
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Klucz sekretny</Text>
                        <Input
                            placeholder="Klucz sekretny"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                        />
                        {errors.consumer_secret && <Text status="danger">{errors.consumer_secret.message}</Text>}
                    </>
                )}
                name="consumer_secret"
                defaultValue=""
            />

            <Button onPress={handleSubmit(onSubmit)}>Utwórz sklep</Button>
        </>
    );
}