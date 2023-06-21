import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes } from "../routes";
import { LoginFBInput, LoginInput, SignUpInput } from "../types";
import { jojoAPI } from "./jojoAPI";
import { RootState } from "../RTKstore";

// Define a service using a base URL and expected endpoints
export const loginApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (loginInput: LoginInput) => ({
        url: apiRoutes.login,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInput),
      }),

      invalidatesTags: ["user"],
    }),
    postUserLoginFB: builder.mutation({
      query: (loginFBInput: LoginFBInput) => ({
        url: apiRoutes.loginFB,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFBInput),
      }),

      invalidatesTags: ["user"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: apiRoutes.user,
      }),

      providesTags: ["user"],
    }),
    getTenants: builder.query({
      query: () => ({
        url: apiRoutes.tenants,
      }),
      forceRefetch({ currentArg, previousArg, state }) {
        const rootState: RootState = state as any;
        const data = rootState.jojoAPI.queries.getTenants?.data as any;
        const result = data?.result;

        return !result;
      },
      providesTags: ["user"],
    }),
    postUserSignUp: builder.mutation({
      query: (signUpInput: SignUpInput) => ({
        url: apiRoutes.signup,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(signUpInput),
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: apiRoutes.user,
        method: "DELETE",
      }),
      invalidatesTags: ["user", "property", "event", "profile"],
    }),
    patchUser: builder.mutation({
      query: (arg: { id: number; body: FormData }) => ({
        url: apiRoutes.user + `/${arg.id}`,
        method: "PATCH",
        body: arg.body,
      }),
      invalidatesTags: ["user", "property", "event", "profile"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserLoginMutation,
  usePostUserLoginFBMutation,
  useGetUsersQuery,
  usePostUserSignUpMutation,
  useGetTenantsQuery,
  usePatchUserMutation,
  useDeleteUserMutation,
} = loginApi;
