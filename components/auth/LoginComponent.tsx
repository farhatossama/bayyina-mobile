import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import { analyze_api_error_response } from '@/reuseable-functions/api_request_status';
import { decodeJwt } from '@/reuseable-functions/decode_JWT';
import Toast from 'react-native-root-toast';
import { storeDataObject, storeDataString } from '@/globalStorage/asyncStorage';
import { authorized } from '@/features/authorize/authorizeSlice';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';


const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();


    const showToast = (text: string) => {
        const config: any = {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
        }
        let toast = Toast.show(text, config);
    };

    const onLoginRequest = async () => {
        const URI: string = `${BaseURI}/api/Auth/login`;

        try {
            const body: any = {
                Username: username,
                Password: password,
            };

            const res = await axios.post(URI, body, { headers: { 'Content-Type': 'application/json' } });

            if (res.data.success) {

                const tokenExpireyDate = new Date();
                const retfreshTokenExpireyDate = new Date();
                tokenExpireyDate.setSeconds(tokenExpireyDate.getSeconds() + 3600);
                retfreshTokenExpireyDate.setHours(tokenExpireyDate.getHours() + 480);
                let tokenPayload: any = decodeJwt(res.data.token);
                let authData = {
                    token: res.data.token,
                    refreshToken: res.data.refreshToken,
                    tokenExpiration: tokenExpireyDate.toString(),
                    refreshTokenExpiration: retfreshTokenExpireyDate.toString(),
                };
                dispatch(authorized({ ...authData, user: tokenPayload, isLogged: true }));

                await storeDataObject('user', tokenPayload);
                await storeDataObject('auth', authData);
                await storeDataObject('isLogged', { isLogged: true });
                router.replace("/");
                showToast("أهلا، تكرم عينك");
            } else {
                Alert.alert('فشل في تسجيل الدخول', res.data.errors[0] || 'Unknown error occurred.');
            }
        } catch (e: any) {
            const error: string = analyze_api_error_response(e)
            Alert.alert('فشل في تسجيل الدخول', error || 'Unknown error occurred.');

        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('@/assets/images/logo.png')}
            />
            <TextInput
                onChangeText={(e: any) => setUsername(e)}
                value={username}
                style={styles.input}
                placeholder='الحساب'
            />
            <TextInput
                onChangeText={(e: any) => setPassword(e)}
                value={password}
                style={styles.input}
                placeholder='كلمة السر'
                secureTextEntry
            />
            <Button
                title="تسجيل الدخول"
                // style={styles.button}
                onPress={onLoginRequest}>

            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        alignSelf: 'center',
        width: 230,
        height: 230
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
});

export default LoginComponent;
