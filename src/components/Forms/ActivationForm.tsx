import React from "react";
import {useNavigation} from "@react-navigation/native";
import {LoginNavigationProp} from "../../interfaces/navigation.interfaces";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../../schemas/register.schema";
import {activationSchema} from "../../schemas/activation.schema";
import {config} from "../../config/config";
import {ToastAndroid, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";



export const ActivationForm = () => {
    const navigation = useNavigation<LoginNavigationProp>();

    const {control, handleSubmit, formState: {errors}} = useForm<{activationCode: string; email: string }>({
        resolver: yupResolver(activationSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/user/activation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                ToastAndroid.show(`Konto nie istnieje lub kod aktywacyjny jest niepoprawny.`, ToastAndroid.SHORT);
                return;
            }

            const response = await res.json();
            ToastAndroid.show('Pomyślnie aktywowano konto', ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}],
            });
            return response;
        } catch (e) {
            ToastAndroid.show('Coś poszło nie tak, spróbuj jeszcze raz.', ToastAndroid.SHORT);
            return;
        }
    };

    return(
        <View style={{ padding: 16 }}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text  style={{ fontWeight: 'bold' }}>E-mail</Text>
                        <TextInput
                            placeholder="Wpisz adres e-mail"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                            mode='outlined'
                        />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                    </View>
                )}
                name="email"
                defaultValue=""
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text  style={{ fontWeight: 'bold' }}>Kod aktywacyjny</Text>
                        <TextInput
                            placeholder="Wpisz kod aktywacyjny"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                            mode='outlined'
                        />
                        {errors.activationCode && <Text style={{ color: 'red' }}>{errors.activationCode.message}</Text>}
                    </View>
                )}
                name="activationCode"
                defaultValue=""
            />

            <View style={{ alignItems: 'center' }}>
                <Button onPress={handleSubmit(onSubmit)} mode="contained">Aktywuj konto</Button>
            </View>
        </View>
    )
}