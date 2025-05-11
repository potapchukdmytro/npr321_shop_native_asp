import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServiceResponse, User } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.spr311telegrambot.somee.com/api/'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ServiceResponse<User>, {userName: string, password: string}>({
            query: (credentials) => ({
                url: 'account/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation<ServiceResponse<any>, { userName: string, email: string, password: string }>({
            query: (credentials) => ({
                url: 'account/register',
                method: 'POST',
                body: credentials
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;