import { FetchError } from "./types";

export function formToJson<K extends string>(
  form: HTMLFormElement,
  fields: K[]
): Record<K, string | number | Date> {
  let json = {} as Record<K, string | number | Date>;
  for (let field of fields) {
    json[field] = form[field].value;
  }
  return json;
}

export function showResponseMessage(
  json: any,
  presentAlert: (input: object) => void,
  dismissAll?: () => void
) {
  if ("error" in json) {
    let errorMessages = (json.error as FetchError).data.message;
    errorMessages = Array.isArray(errorMessages)
      ? errorMessages[0]
      : typeof errorMessages == "string"
      ? errorMessages
      : JSON.stringify(errorMessages);
    presentAlert({
      header: errorMessages,
      buttons: [
        {
          text: "OK",
          role: "confirm",
        },
      ],
    });
  } else {
    presentAlert({
      header: "Successful",
      buttons: [
        {
          text: "OK",
          role: "confirm",
          handler: dismissAll,
        },
      ],
    });
  }
}

export function showResponseMessageSignUp(
  json: any,
  presentAlert: (input: object) => void,
  dismissAll?: () => void
) {
  if (!("error" in json)) {
    presentAlert({
      header:
        "A confirmation email has been sent to your registered email address",
      buttons: [
        {
          text: "OK",
          role: "",
          handler: dismissAll,
        },
      ],
    });
  }
}
