import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";
import { PropertyInput } from "../pages/types";
// Define a service using a base URL and expected endpoints
export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL }),
  tagTypes: ["property"],
  endpoints: (builder) => ({
    postProperty: builder.mutation({
      query: (input: {
        propertyInput: PropertyInput;
        token: string | null;
      }) => ({
        url: apiRoutes.property,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + input.token,
          url: apiRoutes.property
        },
        body: JSON.stringify(input.propertyInput),
      }),

      invalidatesTags: ["property"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostPropertyMutation } = propertyApi;
