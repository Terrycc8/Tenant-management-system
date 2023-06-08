export function formToJson<K extends string>(
  form: HTMLFormElement,
  fields: K[]
): Record<K, string> {
  let json = {} as Record<K, string>;
  for (let field of fields) {
    json[field] = form[field].value;
  }
  return json;
}
