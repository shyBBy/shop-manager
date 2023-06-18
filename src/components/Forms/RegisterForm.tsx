import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../../schemas/register.schema";
import {config} from "../../config/config";
import {Button, Text, TextInput, ToastAndroid, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Login: undefined;
    // Dodaj inne ekrany, jeśli są wymagane
};

type LoginNavigationProp = StackNavigationProp<RootStackParamList,
    "Login">;

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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                        <TextInput
                            placeholder="Wpisz swój e-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hasło</Text>
                        <TextInput
                            placeholder="Wpisz swoje hasło"
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                    </View>
                )}
                name="password"
                defaultValue=""
            />
            <View style={{ alignItems: 'center' }}>
                {/*<Button title="Utwórz konto" onPress={handleSubmit(onSubmit)} />*/}
                <Button title="Tymczasowo rejestracja wyłączona" />
            </View>
            <View style={{marginTop: 30 }}>
                <Text>Skorzystaj z konta testowego:</Text>
                <Text>login: test@test.com</Text>
                <Text>haslo: test123</Text>
                <Text>Kliknij poniżej aby przejść na stronę logowania</Text>
            </View>
        </View>
    )


}