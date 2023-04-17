import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const CONSTANT = require("../utils/constant");
const baseUrl = CONSTANT.BASE_URL;

export const recipeApi = createApi({
    reducerPath: `recipeApi`,
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getLatestRecipes: builder.query({
            query: (userId) => `/get-latest-recipes/${userId}`
        }),
        getMostViewedRecipes: builder.query({
            query: (userId) => `/get-most-viewed-recipes/${userId}`
        }),
        getAllRecipes: builder.query({
            query: () => `/get-all-recipes`
        }),
        getRecipeById: builder.query({
            query: ({recipeId, userId}) => `/get-recipe/${recipeId}/${userId}`
        }),
        getRecipeByCategory: builder.query({
            query: ({type, userId}) =>`/get-by-category/${type}/${userId}`
        }),
        getRecipesByTitle: builder.query({
            query: ({title, userId}) => `/search/${title}/${userId}`
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
    useGetRecipeByCategoryQuery,
    useGetRecipesByTitleQuery
} = recipeApi;