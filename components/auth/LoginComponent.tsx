import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import axios from 'axios';
const BaseURI: any = "https://api-bayyina.baqiatawseyaa.com";
const jwtDecode = require('jwt-decode');

const LoginComponent = ({ onLogin }: { onLogin: any }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginRequest = async () => {
        const URI: string = `${BaseURI}/api/Auth/login`;

        try {
            const body: any = {
                Username: username,
                Password: password,
            };

            const res = await axios.post(URI, body, { headers: { 'Content-Type': 'application/json' } });

            if (res.data.success) {
                let user: any = {
                   // user: jwtDecode(res.data.token),
                    token: res.data.token,
                    refreshToken: res.data.refreshToken,
                };

                const tokenExpireyDate = new Date();
                const retfreshTokenExpireyDate = new Date();
                tokenExpireyDate.setSeconds(tokenExpireyDate.getSeconds() + 3600);
                retfreshTokenExpireyDate.setHours(tokenExpireyDate.getHours() + 480);

                user = {
                  //  user: { ...user.user, picture: "" },
                    token: res.data.token,
                    refreshToken: res.data.refreshToken,
                    tokenExpiration: tokenExpireyDate.toLocaleString(),
                    refreshTokenExpiration: retfreshTokenExpireyDate.toLocaleString(),
                };

                console.log(user);
                Alert.alert('Login Successful', 'You have logged in successfully.');
                // Optionally, call `onLogin` to handle post-login logic (e.g., navigation)
                if (onLogin) onLogin(user);
            } else {
                Alert.alert('Login Failed', res.data.errors[0] || 'Unknown error occurred.');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // Axios error
                const status = error.response?.status;
                const message = error.response?.data?.message || error.message;

                console.error('Axios error:', error);

                Alert.alert(
                    'Error',
                    `Status: ${status}\nMessage: ${message}`
                );
            } else {
                // Non-Axios error
                console.error('Error:', error);
                Alert.alert('Error', 'An unexpected error occurred.');
            }
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
