import { useEffect, useState } from "react";
import { AuthResult } from "@/interfaces/interfaces";
import Toast from "react-native-root-toast";
import axios from "axios";
import { analyze_api_error_response } from "@/reuseable-functions/api_request_status";
import useTokenExpiration from '@/hooks/useTokenExpiration';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { unAuthorized, updateRefreshToken } from "@/features/authorize/authorizeSlice";
import { storeDataObject } from "@/globalStorage/asyncStorage";

const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;

const showToast = (text: string) => {
    const config: any = {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
    }
    let toast = Toast.show(text, config);
};
function useIsLogged() {
    const isLogged: any = useAppSelector((state) => state.authorized.isLogged);
    const token: any = useAppSelector((state) => state.authorized.token);
    const refreshToken: any = useAppSelector((state) => state.authorized.refreshToken);
    const dispatch = useAppDispatch()
    const [refreshTokenIsUpdating, setRefreshTokenIsUpdating] = useState<any>(false);

    // Initialize isLogged state with the hook
    const updateUserToken = async () => {
        showToast('يتم تجديد صلاحية الجلسة، يرجى الإنتظار...');

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const body: any = { token, refreshToken }

        const URI: string = `${BaseURI}/api/Auth/RefreshToken`
        try {

            setRefreshTokenIsUpdating(true)
            const result = await axios.post(URI, body, config)
            const tokenNewDate = new Date()
            const refreshDateNew = new Date()

            tokenNewDate.setSeconds(tokenNewDate.getSeconds() + 3600)
            refreshDateNew.setHours(refreshDateNew.getHours() + 480)
            const authData: AuthResult = {
                token: result.data.token,
                refreshToken: result.data.refreshToken,
                tokenExpiration: tokenNewDate.toString(),
                refreshTokenExpiration: refreshDateNew.toString(),
            };
            console.log(authData)
            dispatch(updateRefreshToken(authData))
        } catch (error: any) {
            unAuthorized()
            storeDataObject('auth',{})
            storeDataObject('user',{})
            storeDataObject('isLogged',false)
            const api_respo: string = analyze_api_error_response(error)
            console.log(api_respo)
        }
    }

    useTokenExpiration(updateUserToken, refreshTokenIsUpdating)


}

export default useIsLogged;
