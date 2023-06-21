import {
  IonCol,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { PropertyListOutput, TenantListOutput } from "../types";
import { useState } from "react";

export function CustomSelector(props: {
  readonly?: boolean;
  defaultValue?: string;
  value: string[][];
  title: string;
  name: string;
}) {
  const { value, title, name } = props;
  return (
    <IonCol>
      <IonSelect
        label={title}
        labelPlacement="floating"
        fill="outline"
        name={name}
        value={props.defaultValue || ""}
      >
        {value.map((item, idx) => (
          <IonSelectOption
            disabled={props.readonly || false}
            value={item[0]}
            key={idx + 1}
          >
            {item[1]}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonCol>
  );
}

export function CustomSelectorOnFetch(props: {
  value: PropertyListOutput[];
  title: string;
  name: string;
}) {
  const { value, title, name } = props;
  return (
    <IonCol>
      <IonSelect
        label={title}
        labelPlacement="floating"
        fill="outline"
        name={name}
      >
        {!value || value.length == 0 ? (
          <IonSelectOption disabled={true}>
            <IonLabel>No Associated {props.title}.</IonLabel>
          </IonSelectOption>
        ) : value.length > 0 ? (
          value.map((item) => (
            <IonSelectOption value={item.id} key={item.id}>
              {item.title}
            </IonSelectOption>
          ))
        ) : (
          <>Invalid Data: {JSON.stringify(value)}</>
        )}
      </IonSelect>
    </IonCol>
  );
}
export function CustomSelectorOnFetchTenant(props: {
  value: TenantListOutput[];
  title: string;
  name: string;
}) {
  let [results, setResults] = useState([...props.value]);
  const { value, title, name } = props;
  const handleInput = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      props.value.filter((d: TenantListOutput) => {
        if (d.first_name.includes(query) || d.last_name.includes(query)) {
          return false;
        } else return true;
      })
    );
  };
  return (
    <IonCol>
      <IonSelect
        label={title}
        labelPlacement="floating"
        fill="outline"
        name={name}
      >
        {" "}
        <IonSearchbar
          debounce={1000}
          onIonInput={(ev) => handleInput(ev)}
        ></IonSearchbar>
        {!value || value.length == 0 ? (
          <IonSelectOption disabled={true}>
            <IonLabel>No Associated {props.title}.</IonLabel>
          </IonSelectOption>
        ) : value.length > 0 ? (
          value.map((item) => (
            <IonSelectOption value={item.tenant_id} key={item.tenant_id}>
              {item.first_name} {item.last_name}
            </IonSelectOption>
          ))
        ) : (
          <>Invalid Data: {JSON.stringify(value)}</>
        )}
      </IonSelect>
    </IonCol>
  );
}
