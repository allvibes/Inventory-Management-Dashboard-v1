import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token")

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),

  tagTypes: ["Inventory"],

  endpoints: (builder) => ({
    getInventory: builder.query<any[], void>({
      query: () => "/inventory",
      transformResponse: (res: any) => res.data ?? res,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item: any) => ({
                type: "Inventory" as const,
                id: item._id,
              })),
              { type: "Inventory", id: "LIST" },
            ]
          : [{ type: "Inventory", id: "LIST" }],
    }),

    getInventoryById: builder.query<any, string>({
      query: (id) => `/inventory/${id}`,
    }),

    addItem: builder.mutation<any, any>({
      query: (body) => ({
        url: "/inventory",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),

    updateInventory: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...body }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),

    deleteItem: builder.mutation<any, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
  }),
})

export const {
  useGetInventoryQuery,
  useGetInventoryByIdQuery,
  useAddItemMutation,
  useUpdateInventoryMutation,
  useDeleteItemMutation,
} = inventoryApi