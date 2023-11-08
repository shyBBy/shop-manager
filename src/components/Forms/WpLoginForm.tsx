import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {wpLoginSchema} from "../../schemas/wpLogin.schema";
import {config} from "../../config/config";
import {ToastAndroid, View} from "react-native";
import {WpLogin} from "../../interfaces/auth.interfaces";
import {useAuth} from "../../hooks/useAuth";
import {Button, Text, TextInput} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WpLoginForm = () => {
    const { wpLogin, wpToken } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<{ username: string; password: string }>({
        resolver: yupResolver(wpLoginSchema),
    });
    const {user} = useAuth()

    const onSubmit = async (data: WpLogin) => {

        const credential = { username: data.username, password: data.password, userId: user?.id, userEmail: user?.email};

        await wpLogin(credential);
    };


    useEffect(() => {
        const saveWpToken = async () => {
            if (wpToken) {
                // Zapisujemy wpToken w AsyncStorage
                await AsyncStorage.setItem('wpToken', wpToken);
            }
        };

        // Wywołujemy funkcję zapisującą wpToken, gdy wartość wpToken zostanie zmieniona
        saveWpToken();
    }, [wpToken]);


    return (
        <>
            <View style={{ padding: 5 }}>

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Login</Text>
                            <TextInput
                                placeholder="Wpisz wordpress login"
                                keyboardType="default"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={{ marginBottom: 10 }}
                                mode='outlined'
                            />
                            {errors.username && <Text style={{ color: 'red' }}>{errors.username.message}</Text>}
                        </View>
                    )}
                    name="username"
                    defaultValue=""
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Hasło</Text>
                            <TextInput
                                placeholder="Wpisz hasło"
                                keyboardType="default"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={{ marginBottom: 10 }}
                                secureTextEntry={true}
                                mode='outlined'
                            />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                        </View>
                    )}
                    name="password"
                    defaultValue=""
                />
                <View style={{ alignItems: 'center' }}>
                    <Button onPress={handleSubmit(onSubmit)} mode="contained">Autoryzuj się</Button>
                </View>
            </View>
        </>
    );
};