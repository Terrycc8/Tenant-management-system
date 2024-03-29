import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { AuthState } from "../slices/authSlice";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
// Define a service using a base URL and expected endpoints
export const propertyApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProperty: builder.query({
      query: () => ({
        url: apiRoutes.property,
      }),
      forceRefetch({ currentArg, previousArg, state }) {
        const rootState: RootState = state as any;
        const data: any = rootState.jojoAPI.queries.getEvent?.data as any;
        const result = data?.result;

        return !result;
      },
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
        url: apiRoutes.property + `/${id}`,
      }),
      forceRefetch({ currentArg, previousArg, state }) {
        const rootState: RootState = state as any;
        const data: any = rootState.jojoAPI.queries.getEvent?.data as any;
        const result = data?.result;

        return !result;
      },
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "property" as const, id: result.id }, "property"]
          : ["property"],
    }),
    postProperty: builder.mutation({
      query: (body: FormData) => ({
        url: apiRoutes.property,
        method: "POST",

        body,
      }),
      invalidatesTags: ["property", "user", "event"],
    }),
    patchProperty: builder.mutation({
      query: (arg: { body: FormData; id: number }) => ({
        url: apiRoutes.property + `/${arg.id}`,
        method: "PATCH",
        body: arg.body,
      }),
      invalidatesTags: ["property", "user", "event", "home"],
    }),
    deleteProperty: builder.mutation({
      query: (arg: { id: number }) => ({
        url: apiRoutes.property + `/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["property", "user", "event", "home"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePatchPropertyMutation,
  usePostPropertyMutation,
  useDeletePropertyMutation,
  useGetPropertyQuery,
  useGetPropertyDetailQuery,
} = propertyApi;
