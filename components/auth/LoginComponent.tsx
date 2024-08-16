import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import axios from 'axios';
import { analyze_api_error_response } from '@/reuseable-functions/api_request_status';
import { decodeJwt } from '@/reuseable-functions/decode_JWT';
const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;
import Toast from 'react-native-root-toast';
import { storeDataObject, storeDataString } from '@/globalStorage/asyncStorage';
const LoginComponent = ({ isAuthorized }: { isAuthorized: (e: any) => void }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

                isAuthorized(res.data.success)


                let user: any = {
                    user: decodeJwt(res.data.token),
                    token: res.data.token,
                    refreshToken: res.data.refreshToken,
                };
                const tokenExpireyDate = new Date();
                const retfreshTokenExpireyDate = new Date();
                tokenExpireyDate.setSeconds(tokenExpireyDate.getSeconds() + 3600);
                retfreshTokenExpireyDate.setHours(tokenExpireyDate.getHours() + 480);

                user = {
                    user: { ...user.user.payload },
                    token: res.data.token,
                    refreshToken: res.data.refreshToken,
                    tokenExpiration: tokenExpireyDate.toLocaleString(),
                    refreshTokenExpiration: retfreshTokenExpireyDate.toLocaleString(),
                };
                await storeDataObject('user', user);
                await storeDataString('bayyina_token', res.data.token);
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
            <Text style={styles.title}>Login</Text>
            <Input
                onChangeText={(e: any) => setUsername(e)}
                value={username}
                style={styles.input}
                placeholder='Username'
            />
            <Input
                onChangeText={(e: any) => setPassword(e)}
                value={password}
                style={styles.input}
                placeholder='Password'
                secureTextEntry
            />
            <Button style={styles.button} onPress={onLoginRequest}>
                Login
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
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
