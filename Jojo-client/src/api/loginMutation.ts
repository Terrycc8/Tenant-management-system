import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";
import { LoginInput, SignUpInput } from "../pages/types";
import { apiRoutes } from "../routes";
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL }),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (loginInput: LoginInput) => ({
        url: apiRoutes.login,
        method: "POST",
        body: JSON.stringify(loginInput),
      }),

      invalidatesTags: ["login"],
    }),
    postUserSignUp: builder.mutation({
      query: (signUpInput: SignUpInput) => ({
        url: apiRoutes.signup,
        method: "POST",
        body: JSON.stringify(signUpInput),
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostUserLoginMutation, usePostUserSignUpMutation } = loginApi;
