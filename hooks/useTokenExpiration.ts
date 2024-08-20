import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateIsRefreshingToken } from "../features/authorize/authorizeSlice";

function useTokenExpiration(refreshTokenFn: any, refreshTokenUpdateState: boolean) {
    const dispatch = useAppDispatch()
    const token: any = useAppSelector((state) => state.authorized.token);
    const tokenExpiration: any = useAppSelector((state) => state.authorized.tokenExpiration);


    useEffect(() => {
        if (token !== "") {

            let intervalId: any;

            // Function to check if the token is expired
            const isTokenExpired = () => {
                const currentTime = new Date(); // Current time in seconds
                const currentTokenExpiration = new Date(tokenExpiration); // Current time in seconds
                // console.log(currentTokenExpiration);
                //console.log( currentTime);
                return currentTokenExpiration <= currentTime;
            };
            // Function to refresh the token
            const refreshIfNeeded = async () => {

                if (isTokenExpired() && !refreshTokenUpdateState) {
                    // Token is expired, refresh it
                    try {

                        await refreshTokenFn();
                        dispatch(updateIsRefreshingToken({ isRefreshingToken: false }))
                        console.log('user active, refreshing token')
                    } catch (error) {
                        // Handle token refresh error
                        //console.error('Token refresh failed:', error);
                    }
                }
                else if (!isTokenExpired()) {
                    //     console.log('user active and no expiration')
                }
                else if (isTokenExpired()) {
                    //    await refreshTokenFn();
                    //     console.log('user inactive and token expired')
                }
            };

            // Initial check and setup periodic checking
            refreshIfNeeded();
            intervalId = setInterval(refreshIfNeeded, 2000); // Check every 2 seconds



            // Clean up the interval and event listener when the component unmounts
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [tokenExpiration, refreshTokenFn]);
}

export default useTokenExpiration;

