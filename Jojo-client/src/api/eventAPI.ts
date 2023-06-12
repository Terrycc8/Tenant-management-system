import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";
import { EventInput } from "../pages/types";
import { genHeader } from "./genHeader";
// Define a service using a base URL and expected endpoints
export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL + apiRoutes.event }),
  tagTypes: ["event"],
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: (token: string | null) => ({
        url: "",
        headers: genHeader(token),
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
      query: (input: { token: string | null; id: string }) => ({
        url: `/${input.id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + input.token,
          url: apiRoutes.event + `/${input.id}`,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "event" as const, id: result.id }, "event"]
          : ["event"],
    }),
    postEvent: builder.mutation({
      query: (input: { eventInput: EventInput; token: string | null }) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + input.token,
          url: apiRoutes.event,
        },
        body: JSON.stringify(input.eventInput),
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
