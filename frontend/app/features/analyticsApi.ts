import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({

    getDashboardStats: builder.query({
      query: () => "/analytics/stats",
    }),

    getStockTrends: builder.query({
      query: () => "/analytics/trends",
    }),

    getLowStockItems: builder.query({
      query: () => "/analytics/low-stock",
    }),

  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetStockTrendsQuery,
  useGetLowStockItemsQuery,
} = analyticsApi