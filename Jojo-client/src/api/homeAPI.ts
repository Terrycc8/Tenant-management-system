import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
// Define a service using a base URL and expected endpoints
export const homeApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => ({
        url: apiRoutes.index,
      }),
      providesTags: ["home"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHomeQuery } = homeApi;
