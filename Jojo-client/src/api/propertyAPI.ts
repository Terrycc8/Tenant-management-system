import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { AuthState } from "../slices/authSlice";
import { prepareHeaders } from "./prepareHeaders";
// Define a service using a base URL and expected endpoints
export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + apiRoutes.property,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["property"],

  endpoints: (builder) => ({
    getProperty: builder.query({
      query: () => ({
        url: "",
      }),

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((item: { id: number }) => ({
                type: "property" as const,
                id: item.id,
              })),
              "property",
            ]
          : ["property"],
    }),
    getPropertyDetail: builder.query({
      query: (id: string) => ({
        url: `/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "property" as const, id: result.id }, "property"]
          : ["property"],
    }),
    postProperty: builder.mutation({
      query: (body: FormData) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["property"],
    }),
    patchProperty: builder.mutation({
      query: (arg: { body: FormData; id: number }) => ({
        url: `/${arg.id}`,
        method: "PATCH",
        body: arg.body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "property", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePatchPropertyMutation,
  usePostPropertyMutation,
  useGetPropertyQuery,
  useGetPropertyDetailQuery,
} = propertyApi;
