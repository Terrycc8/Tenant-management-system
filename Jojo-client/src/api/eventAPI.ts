import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
// Define a service using a base URL and expected endpoints
export const eventApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: apiRoutes.event,
      }),

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((item: { id: number }) => ({
                type: "event" as const,
                id: item.id,
              })),
              "event",
            ]
          : ["event"],
    }),
    getEventDetail: builder.query({
      query: (id: string) => ({
        url: apiRoutes.event + `/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "event" as const, id: result.id }, "event"]
          : ["event"],
    }),
    postEvent: builder.mutation({
      query: (body: FormData) => ({
        url: apiRoutes.event,
        method: "POST",

        body,
      }),
      invalidatesTags: ["property", "user", "event"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostEventMutation,
  useGetEventQuery,
  useGetEventDetailQuery,
} = eventApi;
