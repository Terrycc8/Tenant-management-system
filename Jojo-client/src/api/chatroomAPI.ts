import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import serverURL from "../ServerDomain";

import { apiRoutes, routes } from "../routes";
import { genHeader } from "./genHeader";

export const chatroomApi = createApi({
    reducerPath: "chatroomApi",
    baseQuery: fetchBaseQuery({ baseUrl: serverURL + apiRoutes.chatroom}),
    tagTypes: ["chatroom"],
    endpoints: (builder) => ({
      getChat: builder.query({
        query: (token: string | null) => ({
          url: "",
          headers: genHeader(token),
        }),
  
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map((item: { id: number }) => ({
                  type: "chatroom" as const,
                  id: item.id,
                })),
                "chatroom",
              ]
            : ["chatroom"],
      }),
    }),
});

export const {
  useGetChatQuery,
} = chatroomApi;
