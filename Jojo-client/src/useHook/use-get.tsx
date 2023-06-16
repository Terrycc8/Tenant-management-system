import { useEffect, useState } from "react";
import { useToken } from "./use-token";
import serverURL from "../ServerDomain";
import { IonText } from "@ionic/react";

export function useGet<T extends object>(url: string) {
  type State = { error?: string } & Partial<T>;
  const [data, setData] = useState<State>({});
  const token = useToken();
  useEffect(() => {
    fetch(serverURL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setData({ error: String(err) } as State));
  }, [token]);

  function render(fn: (data: T) => any) {
    if (data.error) {
      return (
        <p className="ion-text-wrap">
          <IonText color="danger">{data.error}</IonText>
        </p>
      );
    }
    fn(data as T);
  }

  return { data, render };
}
