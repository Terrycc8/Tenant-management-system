import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
import { useDispatch } from "react-redux";
import { setScroll } from "../slices/scrollSlice";
// Define a service using a base URL and expected endpoints
export const eventApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: (arg: { page: number; itemsPerPage: number }) => ({
        url: apiRoutes.event + `/?offset=${arg.itemsPerPage}&page=${arg.page}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const currentCacheSet = new Set(
          currentCache.result.map((item: Record<string, number | string>) => {
            return item.id;
          })
        );

        currentCache.result.push(
          ...newItems.result.filter((item: Record<string, number | string>) => {
            return !currentCacheSet.has(item.id);
          })
        );
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["event"],
    }),

    postEvent: builder.mutation({
      query: (body: FormData) => ({
        url: apiRoutes.event,
        method: "POST",
        body,
      }),
      invalidatesTags: ["event", "home"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostEventMutation, useGetEventQuery } = eventApi;
