import { configureStore } from "@reduxjs/toolkit";

import { recipeApi } from "../service/recipeApi";

export default configureStore({
    reducer: {
        [recipeApi.reducerPath]: recipeApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});