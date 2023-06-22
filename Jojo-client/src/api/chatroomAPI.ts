import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "../routes";
import { genHeader } from "./genHeader";
import { serverURL } from "../ServerDomain";
import { chatService } from "../api";
import { jojoAPI } from "./jojoAPI";

export const chatroomApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    // getChat: builder.query({
    //   query: (token: string | null) => ({
    //     url: apiRoutes.chatroom,
    //     headers: genHeader(token),
    //   }),

    //   providesTags: (result, error, arg) =>
    //     result
    //       ? [
    //           ...result.map((item: { id: number }) => ({
    //             type: "chatroom" as const,
    //             id: item.id,
    //           })),
    //           "chatroom",
    //         ]
    //       : ["chatroom"],
    // }),
    getChatroom: builder.query({
      query: () => ({
        url: apiRoutes.chatroom,
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

export const { useGetChatroomQuery } = chatroomApi;

export function useChatroomList(token: string | null) {
  const query = useQuery({
    queryKey: ["chatlist"], // todo does mean link, just reference
    retry: false,
    queryFn: () => chatService.getRooms(),
  });
  // console.log('chat room list query:', query)
  const error = (query.error as any)?.response?.data?.error;
  const data = query.data;
  return {
    error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    data,
  };
}

export function getMessages(id: string) {
  const query = useQuery({
    queryKey: ["/messages/:id"],
    retry: false,
    queryFn: () => chatService.getMessageList(id),
  });
  // console.log('chat room list query:', query)
  const error = (query.error as any)?.response?.data?.error;
  const data = query.data;
  return {
    error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    data,
  };
}

// export function sendMessage(id: string) {

// export function usePostChatroomMutation(token: string | null) {
//   const query = useQuery({
//     queryKey: ['/chat/rooms'],
//     retry: false,
//     queryFn: () =>
//       chatService.getRooms()
//   })
//   // console.log('chat room list query:', query)
//   const error = (query.error as any)?.response?.data?.error
//   const data = query.data
//   return { error, isLoading: query.isLoading, isFetching: query.isFetching, data }
// }
