import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";

import { RootState } from "../RTKstore";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
import { TenantListOutput } from "../types";
// Define a service using a base URL and expected endpoints

type GetTenantResult = {
  result: TenantListOutput[];
  totalItem: number;
};

export const tenantApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTenant: builder.query<
      GetTenantResult,
      { page: number; itemsPerPage: number }
    >({
      query: (arg) => ({
        url:
          apiRoutes.tenants + `/?offset=${arg.itemsPerPage}&page=${arg.page}`,
      }),

      forceRefetch({ currentArg, previousArg, state }) {
        const rootState: RootState = state as any;
        const data: GetTenantResult = rootState.jojoAPI.queries.getTenant
          ?.data as any;
        const result = data?.result;

        return (
          !result ||
          currentArg?.page != previousArg?.page ||
          currentArg?.itemsPerPage != previousArg?.itemsPerPage
        );
      },
      providesTags: ["tenant"],
    }),
    addTenant: builder.mutation({
      query: (arg: { tenant_id: number; property_id: number }) => ({
        url: apiRoutes.tenants,
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(arg),
      }),

      invalidatesTags: ["tenant"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTenantQuery, useAddTenantMutation } = tenantApi;
