import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, setUser } from "@/store/slices/authSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }

    return headers
  },
})

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled

          dispatch(
            setCredentials({
              user: data.user,
              token: data.token,
            })
          )
        } catch (err) {
          console.error("Login failed:", err)
        }
      },
    }),

    register: builder.mutation({
  query: (body) => ({
    url: "/auth/register",
    method: "POST",
    body,
  }),
  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      const { data } = await queryFulfilled

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      )
    } catch (err) {
      console.error("Register failed:", err)
    }
  },
}),

    getCurrentUser: builder.query({
  query: () => "/auth/me",

  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      const { data } = await queryFulfilled

      // 🔥 THIS LINE IS THE WHOLE FIX
      dispatch(setUser(data.user))
    } catch (err) {
      console.log("Session restore failed")
    }
  },
}),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi