import serverURL from "../ServerDomain";
import { apiRoutes, routes } from "../routes";
import { AuthState } from "../slices/authSlice";
import { prepareHeaders } from "./prepareHeaders";
import { jojoAPI } from "./jojoAPI";
import { PaymentListOutput } from "../types";
import { RootState } from "../RTKstore";

type GetPaymentResult = {
  result: PaymentListOutput[];
  totalItem: number;
};

export const paymentApi = jojoAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => ({
        url: apiRoutes.payment,
      }),

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((item: { id: number }) => ({
                type: "payment" as const,
                id: item.id,
              })),
              "payment",
            ]
          : ["payment"],
    }),
    // getPayment: builder.query<
    //   GetPaymentResult,
    //   { page: number; itemsPerPage: number }
    // >({
    //   query: (arg) => ({
    //     url:
    //       apiRoutes.payment + `/?offset=${arg.itemsPerPage}&page=${arg.page}`,
    //   }),
    //   // serializeQueryArgs: ({ endpointName }) => {
    //   //   return endpointName;
    //   // },

    //   forceRefetch({ currentArg, previousArg, state }) {
    //     const rootState: RootState = state as any;
    //     const data: GetPaymentResult = rootState.jojoAPI.queries.getPayment
    //       ?.data as any;
    //     const result = data?.result;

    //     return (
    //       !result ||
    //       currentArg?.page != previousArg?.page ||
    //       currentArg?.itemsPerPage != previousArg?.itemsPerPage
    //     );
    //   },
    //   providesTags: ["payment"],
    // }),

    getPaymentDetail: builder.query({
      query: (id: string) => ({
        url: apiRoutes.payment + `/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "payment" as const, id: result.id }, "payment"]
          : ["payment"],
    }),
    postPayment: builder.mutation({
      query: (body: FormData) => ({
        url: apiRoutes.payment,
        method: "POST",
        body,
      }),
      invalidatesTags: ["payment", "user", "event"],
    }),
    patchPayment: builder.mutation({
      query: (arg: { body: FormData; id: number }) => ({
        url: apiRoutes.payment + `/${arg.id}`,
        method: "PATCH",
        body: arg.body,
      }),
      invalidatesTags: ["payment", "user", "event", "home"],
    }),
    deletePayment: builder.mutation({
      query: (arg: { id: number }) => ({
        url: apiRoutes.payment + `/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment", "user", "event", "home"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePatchPaymentMutation,
  usePostPaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentQuery,
  useGetPaymentDetailQuery,
} = paymentApi;
