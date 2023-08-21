import React from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {sendMessageSchema} from "../../schemas/sendMessage.schema";
import {config} from "../../config/config";
import {ToastAndroid, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";

export const SendMessageToClientForm = (props: any) => {
    const {refundUuid} = props

    const {control, handleSubmit, formState: {errors}} = useForm<{ emailContent: string }>({
        resolver: yupResolver(sendMessageSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/refund/${refundUuid}/sendemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log(`data:`, data)
            console.log(`RES:`, res)
            if (!res.ok) {
                ToastAndroid.show(`Coś poszło nie tak`, ToastAndroid.SHORT);
                return;
            }

            const response = await res.json();
            ToastAndroid.show('Pomyślnie wysłano wiadomość do klienta', ToastAndroid.SHORT);
            return response;
        } catch (e) {
            ToastAndroid.show('Coś poszło nie tak, spróbuj jeszcze raz.', ToastAndroid.SHORT);
            return;
        }
    };



    return(
        <>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text  style={{ fontWeight: 'bold' }}>Treść wiadomości:</Text>
                        <TextInput
                            placeholder="Dodaj odpowiedź"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            mode='outlined'
                            multiline  // Włącza wieloliniowy tryb tekstu
                            numberOfLines={4}  // Domyślna liczba widocznych linii
                            style={{ height: 120 }}  // Określa wysokość pola tekstowego
                        />
                        {errors.emailContent && <Text style={{ color: 'red' }}>{errors.emailContent.message}</Text>}
                    </View>
                )}
                name="emailContent"
                defaultValue=""
            />
            <View style={{ alignItems: 'center' }}>
                <Button onPress={handleSubmit(onSubmit)} mode="contained">Wyślij wiadomość</Button>
            </View>
        </>
    )
}