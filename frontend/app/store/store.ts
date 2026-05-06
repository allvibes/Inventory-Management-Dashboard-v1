import { configureStore } from "@reduxjs/toolkit"
import { inventoryApi } from "../features/inventoryApi"
import { authApi } from "../features/authApi"

import authReducer from "./slices/authSlice"

// ✅ ADD THESE
import notificationReducer from "../features/notificationSlice"
import searchReducer from "../store/slices/searchSlice"

export const store = configureStore({
  reducer: {
    // APIs
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

    // existing
    auth: authReducer,

    // ✅ NEW
    notifications: notificationReducer,
    search: searchReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      inventoryApi.middleware,
      authApi.middleware
    ),
})

// ✅ TYPES (GOOD PRACTICE — KEEP THIS)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch