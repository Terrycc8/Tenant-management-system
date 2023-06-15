import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useQuery } from '@tanstack/react-query'
import { apiRoutes } from "../routes";
import { genHeader } from "./genHeader";
import { serverURL } from "../ServerDomain";
import { chatService } from "../api";

export const chatroomApi = createApi({
  reducerPath: "chatroomApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL + apiRoutes.chatroom }),
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

// export const {
//   // useGetChatQuery,
// } = chatroomApi;

export function useChatroomList(token: string | null) {
  const query = useQuery({
    queryKey: ['/chat/rooms'],
    retry: false,
    queryFn: () =>
      chatService.getRooms()
  })
  // console.log('chat room list query:', query)
  const error = (query.error as any)?.response?.data?.error
  const data = query.data
  return { error, isLoading: query.isLoading, isFetching: query.isFetching, data }
}


