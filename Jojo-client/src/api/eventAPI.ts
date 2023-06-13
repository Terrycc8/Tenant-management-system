import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";
import { EventInput } from "../pages/types";
import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
// Define a service using a base URL and expected endpoints
export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + apiRoutes.event,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["event"],
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: "",
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
        url: `/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "event" as const, id: result.id }, "event"]
          : ["event"],
    }),
    postEvent: builder.mutation({
      query: (eventInput: EventInput) => ({
        url: "",
        method: "POST",

        body: JSON.stringify(eventInput),
      }),
      invalidatesTags: ["event"],
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
