export function formToJson<K extends string>(
  form: HTMLFormElement,
  fields: K[]
): Record<K, string | number | Date> {
  let json = {} as Record<K, string | number | Date>;
  for (let field of fields) {
    console.log(form[field]);
    if (form[field].type == "number") {
      json[field] = parseInt(form[field].value);
    } else if (field == "rental_end_at" || field == "rental_start_at") {
      json[field] = form[field].value;
    } else json[field] = form[field].value;
  }
  return json;
}
