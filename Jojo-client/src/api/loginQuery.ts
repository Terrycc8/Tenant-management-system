import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";
import { routes } from "../routes";
type LoginInput = {
  username: string | null | undefined;
  password: string | null | undefined;
};
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL }),
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (loginInput: LoginInput) => ({
        url: routes.login,
        method: "POST",
        body: loginInput,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostUserLoginMutation } = loginApi;
