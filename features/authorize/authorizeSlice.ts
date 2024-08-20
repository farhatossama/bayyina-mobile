import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResult } from "../../interfaces/interfaces";
import { getObjectData, storeDataObject } from "@/globalStorage/asyncStorage";
import { router } from 'expo-router';
const initialState: AuthResult = {
  token: "",
  refreshToken: "",
  user: "",
  tokenExpiration: "",
  refreshTokenExpiration: "",
  isLogged: false,
  isRefreshingToken: ""
};



const authorizeSlice = createSlice({
  name: "authorize",
  initialState,
  reducers: {
    authorized(state: AuthResult, action: PayloadAction<AuthResult>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiration = action.payload.tokenExpiration;
      state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
      state.isLogged = action.payload.isLogged;
      state.isRefreshingToken = action.payload.isRefreshingToken;
      
      const auth: any = {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        tokenExpiration: action.payload.tokenExpiration,
        refreshTokenExpiration: action.payload.refreshTokenExpiration
      }
      const user: any = action.payload.user
      storeDataObject('auth', auth)
      storeDataObject('user', user)

    },
    updateRefreshToken(state: AuthResult, action: PayloadAction<AuthResult>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiration = action.payload.tokenExpiration;
      state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
      state.isRefreshingToken = false;
      const auth: any = {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        tokenExpiration: action.payload.tokenExpiration,
        refreshTokenExpiration: action.payload.refreshTokenExpiration
      }
      storeDataObject('auth', auth)
    },

    updateIsRefreshingToken(state: AuthResult, action: PayloadAction<AuthResult>) {
      state.isRefreshingToken = action.payload.isRefreshingToken;
    },
    unAuthorized(state: any) {
      router.replace("/sign-in");
      state.user = {};
      state.token = "";
      state.refreshToken = "";
      state.isLogged = false;
      state.isRefreshingToken = false;
      state.tokenExpiration = "";
      state.refreshTokenExpiration = "";
     

    },
  },
});

export const { authorized, unAuthorized, updateRefreshToken, updateIsRefreshingToken } = authorizeSlice.actions;
export default authorizeSlice.reducer;
