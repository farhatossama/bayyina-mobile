import { configureStore } from "@reduxjs/toolkit";
import authorizeReducer from "../features/authorize/authorizeSlice";
import { apiUpdateTokenSlice } from "../features/authorize/refreshTokenSlice";
export const store = configureStore({
  reducer: {
    authorized: authorizeReducer,
    [apiUpdateTokenSlice.reducerPath]: apiUpdateTokenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiUpdateTokenSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
