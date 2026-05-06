import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "@/features/authApi"
import authReducer from "./slices/authSlice"
import searchReducer from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    search: searchReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch