import serverURL from "../ServerDomain";
import { prepareHeaders } from "./prepareHeaders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const jojoAPI = createApi({
  reducerPath: "jojoAPI",
  tagTypes: [
    "property",
    "user",
    "event",
    "home",
    "profile",
    "payment",
    "tenant",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: () => ({}),
});
