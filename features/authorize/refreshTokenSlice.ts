import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;



export const apiUpdateTokenSlice = createApi({
    
    // Set the baseUrl for every endpoint below
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURI}/api/Auth/`, prepareHeaders(headers) {
            headers.set("Authorization", ""  );
            return headers;
        },
    }),
    endpoints: (builder) => ({
 
        updateToken: builder.query({
            query: ({ data }) => ({
                url: `RefreshToken`,
                // When performing a mutation, you typically use a method of
                // PATCH/PUT/POST/DELETE for REST endpoints
                method: 'POST',
                // fetchBaseQuery automatically adds `content-type: application/json` to
                // the Headers and calls `JSON.stringify(patch)`
                body: data,
            }),
        }),
    }),
})
export const { useUpdateTokenQuery } = apiUpdateTokenSlice;

