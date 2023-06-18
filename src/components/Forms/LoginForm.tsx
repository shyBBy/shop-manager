import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from '../../interfaces/auth.interfaces';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../schemas/login.schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginForm = () => {
    const [message, setMessage] = useState('');
    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
        resolver: yupResolver(loginSchema),
    });

    const handleFormSubmit = async (data: Login) => {
        try {
            await signIn(data);

            const token = await AsyncStorage.getItem('jwt');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            setMessage('Wystąpił błąd logowania');
        }
    };

    return (
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
                <Button title="Zaloguj się" onPress={handleSubmit(handleFormSubmit)} />
            </View>
        </View>
    );
};

export default LoginForm;
