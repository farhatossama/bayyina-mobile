import { useState } from 'react';

function useToken() {
    const getToken = () => {
        const tokenString: any = sessionStorage.getItem('token');
        const userToken: any = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: any) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
} export default useToken
