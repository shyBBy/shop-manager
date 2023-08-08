import React from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {sendMessageSchema} from "../../schemas/sendMessage.schema";
import {config} from "../../config/config";
import {ToastAndroid, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";

export const SendMessageToClientForm = () => {

    const {control, handleSubmit, formState: {errors}} = useForm<{ message: string }>({
        resolver: yupResolver(sendMessageSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
                return;
            }

            const response = await res.json();
            ToastAndroid.show('Pomyślnie utworzono konto', ToastAndroid.SHORT);

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
                        <Text  style={{ fontWeight: 'bold' }}>Login</Text>
                        <TextInput
                            placeholder="Wpisz swój e-mail"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                            mode='outlined'
                        />
                        {errors.message && <Text style={{ color: 'red' }}>{errors.message.message}</Text>}
                    </View>
                )}
                name="message"
                defaultValue=""
            />
            <View style={{ alignItems: 'center' }}>
                <Button onPress={handleSubmit(onSubmit)} mode="contained">Stwórz konto</Button>
            </View>
        </>
    )
}