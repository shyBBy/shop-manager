import React, {useState} from 'react';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Login} from '../../interfaces/auth.interfaces';
import {useAuth} from '../../hooks/useAuth';
import {loginSchema} from '../../schemas/login.schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Text, Card, Button, TextInput} from "react-native-paper";
import {theme} from "../../theme";

const LoginForm = () => {
    const [message, setMessage] = useState('');
    const {signIn} = useAuth();

    const {control, handleSubmit, formState: {errors}} = useForm<{ email: string; password: string }>({
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
        <View style={{padding: 16}}>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View>
                        <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Login:</Text>
                        <TextInput
                            placeholder="Wpisz swój adres e-mail"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{marginBottom: 10}}
                            mode='outlined'
                        />
                        {errors.email && <Text style={{color: 'red'}}>{errors.email.message}</Text>}
                    </View>
                )}
                name="email"
                defaultValue=""
            />

            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <View>
                        <Text variant='titleLarge' style={{color: theme.colors.primary, fontFamily: 'OswaldLight'}}>Hasło:</Text>
                        <TextInput
                            placeholder="Wpisz swoje hasło"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{marginBottom: 10}}
                            secureTextEntry={true}
                            mode='outlined'
                        />
                        {errors.password && <Text style={{color: 'red'}}>{errors.password.message}</Text>}
                    </View>
                )}
                name="password"
                defaultValue=""
            />
            <View style={{alignItems: 'center'}}>
                <Button onPress={handleSubmit(handleFormSubmit)} mode="contained">Zaloguj się</Button>
            </View>
        </View>
    );
};

export default LoginForm;
