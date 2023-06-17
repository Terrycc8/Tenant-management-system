import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes } from "../routes";
import { LoginInput, SignUpInput } from "../types";
import { jojoAPI } from "./jojoAPI";

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
    getUsers: builder.query({
      query: () => ({
        url: apiRoutes.user,
      }),

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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserLoginMutation,
  useGetUsersQuery,
  usePostUserSignUpMutation,
  useDeleteUserMutation,
} = loginApi;
