import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "./types";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    tagTypes: ["Category"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.spr311telegrambot.somee.com/api/",
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "category",
            providesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: "category",
                method: "DELETE",
                params: { id },
            }),
            invalidatesTags: ["Category"],
        }),
        createCategory: builder.mutation<void, FormData>({
            query: (data) => ({
                url: "category",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
} = categoryApi;
