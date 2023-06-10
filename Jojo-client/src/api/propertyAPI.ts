import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";
import { PropertyInput } from "../pages/types";
// Define a service using a base URL and expected endpoints
export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL + apiRoutes.property }),
  tagTypes: ["property"],
  endpoints: (builder) => ({
    getProperty: builder.query({
      query: (token: string | null) => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
          url: apiRoutes.property,
        },
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
      query: (input: { token: string | null; id: string }) => ({
        url: `/${input.id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + input.token,
          url: apiRoutes.property + `/${input.id}`,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "property" as const, id: result.id }, "property"]
          : ["property"],
    }),
    postProperty: builder.mutation({
      query: (input: {
        propertyInput: PropertyInput;
        token: string | null;
      }) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + input.token,
          url: apiRoutes.property,
        },
        body: JSON.stringify(input.propertyInput),
      }),
      invalidatesTags: ["property"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostPropertyMutation,
  useGetPropertyQuery,
  useGetPropertyDetailQuery,
} = propertyApi;
