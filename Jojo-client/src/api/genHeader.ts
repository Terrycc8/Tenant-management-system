export function genHeader(token?: string | null) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
}
