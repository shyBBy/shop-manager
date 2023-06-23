import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../../schemas/register.schema";
import {config} from "../../config/config";
import {ToastAndroid, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Button, Card, Input, Text} from '@ui-kitten/components';
import {LoginNavigationProp} from "../../interfaces/navigation.interfaces";


export const RegisterForm = () => {
    const navigation = useNavigation<LoginNavigationProp>();

    const {control, handleSubmit, formState: {errors}} = useForm<{ email: string; password: string }>({
        resolver: yupResolver(registerSchema),
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
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Login</Text>
                        <Input
                            placeholder="Wpisz swój e-mail"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
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
                        <Text category="h6" style={{ fontWeight: 'bold' }}>Hasło</Text>
                        <Input
                            placeholder="Wpisz hasło"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ marginBottom: 10 }}
                            secureTextEntry={true}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                    </View>
                )}
                name="password"
                defaultValue=""
            />
            <View style={{ alignItems: 'center' }}>
                <Button onPress={handleSubmit(onSubmit)}>Stwórz konto</Button>
            </View>
        </View>
    )


}