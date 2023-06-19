import { apiRoutes, routes } from "../routes";

import { jojoAPI } from "./jojoAPI";
// Define a service using a base URL and expected endpoints
export const profileApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: apiRoutes.profile,
      }),

      providesTags: ["profile"],
    }),

    patchProfile: builder.mutation({
      query: () => ({
        url: apiRoutes.profile,
        method: "PATCH",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePatchProfileMutation, useGetProfileQuery } = profileApi;
