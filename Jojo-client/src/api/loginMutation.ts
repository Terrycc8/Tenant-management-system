import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, apiUserPrefix } from "../routes";
import { prepareHeaders } from "./prepareHeaders";
import { LoginInput, SignUpInput } from "../types";
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + apiRoutes.user,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["login", "user"],
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (loginInput: LoginInput) => ({
        url: apiRoutes.login,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInput),
      }),

      invalidatesTags: ["login"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: apiRoutes.user,
      }),

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((item: { id: number }) => ({
                type: "user" as const,
                id: item.id,
              })),
              "user",
            ]
          : ["user"],
    }),
    postUserSignUp: builder.mutation({
      query: (signUpInput: SignUpInput) => ({
        url: apiRoutes.signup,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(signUpInput),
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserLoginMutation,
  useGetUsersQuery,
  usePostUserSignUpMutation,
} = loginApi;
