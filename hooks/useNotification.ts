
import { useEffect, useState } from "react";
import { getObjectData, getStringData } from "@/globalStorage/asyncStorage";
import { HubConnectionBuilder, JsonHubProtocol, } from '@microsoft/signalr';
import { AuthResult } from "@/interfaces/interfaces";
import axios from "axios";


function useNotification(props: any) {
    const token = await getObjectData('user');
    const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;
    const [currentConnection, setCurrentConnection] = useState<any>(null);
    const [pushRefreshTokenTime, setPushRefreshTokenTime] = useState<any>(1);
    const refreshToken: any = null;
    const [refreshTokenIsUpdating, setRefreshTokenIsUpdating] = useState<any>(false);


    const tokenExpiration: any = null;
    const refreshTokenExpiration: any = null;

    const tokenExpirationDate = new Date(tokenExpiration);
    const refreshTokenExpirationDate = new Date(refreshTokenExpiration);

    const logoutUser = () => {

        //    messageApi.info({ duration: 2, content: "في امان الله", key: "78967" })
        setTimeout(() => {

            sessionStorage.setItem('isReloaded', 'false')
            // dispatch(unAuthorized());

            if (currentConnection) {
                currentConnection.stop()
                setCurrentConnection(null)
                //   setCurrentConnectionChat(null)
                //     navigate("/login");
            }
            else {
                currentConnection && currentConnection.stop()
                setCurrentConnection(null)
                //  setCurrentConnectionChat(null)
                //       navigate("/login");
            }
        }, 1000)

    };
    const getRefreshedToken = async () => {
        if (token === "" && refreshToken === "") {
            return
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const body: any = {
            token,
            refreshToken
        }
        const newTokenRequest: AuthResult = {
            token: "",
            refreshToken: "",
            tokenExpiration: ""
        }
        const URI: string = `${BaseURI}/api/Auth/RefreshToken`
        try {

            setRefreshTokenIsUpdating(true)
            const result = await axios.post(URI, body, config)
            const tokenNewDate = new Date()
            const refreshDateNew = new Date()


            tokenNewDate.setSeconds(tokenNewDate.getSeconds() + 3600)
            refreshDateNew.setHours(refreshDateNew.getHours() + 480)
            newTokenRequest.refreshToken = result.data.refreshToken;
            newTokenRequest.token = result.data.token;
            newTokenRequest.tokenExpiration = tokenNewDate.toString();
            newTokenRequest.refreshTokenExpiration = refreshDateNew.toString();
            //dispatch(updateRefreshToken(newTokenRequest))

            setTimeout(() => {
                //  messageApi.destroy();
                //   messageApi.success('تم تجديد الصلاحيّة', 1);
                setRefreshTokenIsUpdating(false)
            }, 1500);
        } catch (error: any) {
            console.log(error.message)
            if (error.message.includes('Network Error')) {
                //  messageApi.destroy();

                // messageApi.error('فشل في تجديد صلاحية الجلسة، يرجى إعادة التسجيل الدخول')
                // logoutUser()
            }
            else if (error.response.status === 400) {
                console.log('لم تنتهي بعد')
                // messageApi.destroy();
                //  logoutUser()

            } else {
                //  logoutUser()
                //   messageApi.destroy();
                //  messageApi.info('فشل في تجديد صلاحية الجلسة، يرجى إعادة التسجيل الدخول')
            }
        }
    }
    useEffect(() => {
        try {
            if (token !== "" && currentConnection == null && (tokenExpirationDate > new Date())) {
                const newConnection: any = new HubConnectionBuilder()
                    .withUrl(`${BaseURI}/hubs/notification`, { accessTokenFactory: () => token + "" })
                    .withAutomaticReconnect()
                    .withHubProtocol(new JsonHubProtocol())
                    .build();
                setCurrentConnection(newConnection);
                
            }
            else if (currentConnection) {
                currentConnection.stop()
                setCurrentConnection(null)
            }
        } catch (e: any) {
            console.log(e?.message)
            if (!currentConnection) {
                currentConnection.stop()
                setCurrentConnection(null)
            }
        }
    }, [token]);// eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        if (currentConnection && !currentConnection?.connection?._connectionStarted) {

            currentConnection.start().then(async () => {
                console.log('Connected!');



            }).catch((e: any) => {
                if (new Date() > tokenExpirationDate && refreshTokenExpirationDate > new Date()) {
                    if (currentConnection !== null) {
                        currentConnection.stop()
                        setCurrentConnection(null)
                    }
                    setPushRefreshTokenTime((prev: any) => prev + 1)
                    setTimeout(() => {
                        getRefreshedToken()
                    }, pushRefreshTokenTime * 2000)
                }
                else if (e?.message?.includes(`Status code '401'`) && new Date() > refreshTokenExpirationDate) {
                    // messageApi.info('إنتهت صلاحية الجلسة، يرجى إعادة التسجيل الدخول');
                    logoutUser()
                }
                else if (e?.message?.includes(`Status code '401'`)) {
                    if (currentConnection !== null) {
                        currentConnection.stop()
                        setCurrentConnection(null)
                    }
                    setPushRefreshTokenTime((prev: any) => prev + 1)
                    setTimeout(() => {
                        getRefreshedToken()
                    },
                        pushRefreshTokenTime * 2000
                    )


                }
            });
        }
    }, [currentConnection, token]);// eslint-disable-line react-hooks/exhaustive-deps


}
export default useNotification  