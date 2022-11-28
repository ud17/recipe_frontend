import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const CONSTANT = require("../utils/constant");
const baseUrl = CONSTANT.BASE_URL;

export const recipeApi = createApi({
    reducerPath: `recipeApi`,
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getLatestRecipes: builder.query({
            query: () => `/get-latest-recipes`
        }),
        getMostViewedRecipes: builder.query({
            query: () => `/get-most-viewed-recipes`
        }),
        getAllRecipes: builder.query({
            query: () => `/get-all-recipes`
        }),
        getRecipeById: builder.query({
            query: (recipeId) => `/get-recipe/${recipeId}`
        }),
        getRecipeByCategory: builder.query({
            query: (type, page) => `/get-by-category/${type}/${page}`
        }),
        incrementRecipeView: builder.mutation({
            query: (recipeId) => ({
                url: `/increment-recipe-view/${recipeId}`,
                method: 'PATCH',
                body: recipeId
            })
        })
    })
});

export const {
    useGetLatestRecipesQuery,
    useGetMostViewedRecipesQuery,
    useGetAllRecipesQuery,
    useGetRecipeByIdQuery,
    useIncrementRecipeViewMutation,
    useGetRecipeByCategoryQuery
} = recipeApi;