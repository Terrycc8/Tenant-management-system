import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
import { useDispatch } from "react-redux";
import { setScroll } from "../slices/scrollSlice";
import { EventListOutput } from "../types";
// Define a service using a base URL and expected endpoints

type GetEventResult = {
  result: EventListOutput[];
  totalItem: number;
};

export const eventApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    patchEvent: builder.mutation({
      query: (arg: {
        action: { type: string; comment: string };
        id: number;
      }) => ({
        headers: { "Content-Type": "application/json" },
        url: apiRoutes.event + `/${arg.id}`,
        method: "PATCH",
        body: JSON.stringify(arg.action),
      }),
      invalidatesTags: ["property", "user", "event", "home"],
    }),
    getEvent: builder.query<
      GetEventResult,
      { page: number; itemsPerPage: number }
    >({
      query: (arg) => ({
        url: apiRoutes.event + `/?offset=${arg.itemsPerPage}&page=${arg.page}`,
      }),
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },

      forceRefetch({ currentArg, previousArg, state }) {
        const rootState: RootState = state as any;
        const data: GetEventResult = rootState.jojoAPI.queries.getEvent
          ?.data as any;
        const result = data?.result;

        return (
          !result ||
          currentArg?.page != previousArg?.page ||
          currentArg?.itemsPerPage != previousArg?.itemsPerPage
        );
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
export const { usePatchEventMutation, usePostEventMutation, useGetEventQuery } =
  eventApi;
