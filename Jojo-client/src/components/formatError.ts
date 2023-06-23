export function formatError(error: string) {
  let formattedError = error.replace("_", " ");
  return formattedError[0].toUpperCase() + formattedError.slice(1);
}
