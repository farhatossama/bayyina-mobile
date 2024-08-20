import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getObjectData } from "@/globalStorage/asyncStorage";
import { authorized } from '@/features/authorize/authorizeSlice';
import useIsLogged from '@/hooks/useIsLogged';

function useInitialStorageLoad() {

  const dispatch = useDispatch();
  useIsLogged()
  useEffect(() => {
    const loadState = async () => {
      try {
        const { token, refreshToken, tokenExpiration, refreshTokenExpiration } = await getObjectData("auth");
        const user: any = await getObjectData("user");
        const isLogged: any = await getObjectData("isLogged");

        const state = {
          token: token,
          refreshToken: refreshToken,
          user: user,
          tokenExpiration: tokenExpiration,
          refreshTokenExpiration: refreshTokenExpiration,
          isLogged,
        };

        dispatch(authorized(state));
      } catch (error) {
        console.error("Error loading initial state from AsyncStorage", error);
      }
    };

    loadState();
  }, []);

}

export default (useInitialStorageLoad)