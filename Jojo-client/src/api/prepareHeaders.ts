import { BaseQueryApi } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../RTKstore";

export function prepareHeaders(
  headers: Headers,
  api: Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">
) {
  const token = (api.getState() as RootState).auth.token;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");
  }
  return headers;
}
