import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";
import { LoginInput, SignUpInput } from "../pages/types";
import { apiRoutes, apiUserPrefix } from "../routes";
import { genHeader } from "./genHeader";
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL + apiRoutes.user }),
  tagTypes: ["login", "user"],
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (loginInput: LoginInput) => ({
        url: apiRoutes.login,
        headers: genHeader(),
        method: "POST",
        body: JSON.stringify(loginInput),
      }),

      invalidatesTags: ["login"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: apiRoutes.user,
        headers: genHeader(),
        method: "GET",
        // body: JSON.stringify(loginInput),
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
        method: "POST",
        headers: genHeader(),
        body: signUpInput,
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostUserLoginMutation, useGetUserQuery, usePostUserSignUpMutation } = loginApi;
