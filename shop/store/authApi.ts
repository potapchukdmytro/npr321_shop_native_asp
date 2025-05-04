import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.spr311telegrambot.somee.com/api/'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ userName:string, email:string }, {userName: string, password: string}>({
            query: (credentials) => ({
                url: 'account/login',
                method: 'POST',
                body: credentials
            })
        })
    })
})

export const { useLoginMutation } = authApi;