import { IonCol, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PropertyListOutput, TenantListOutput } from "../types";

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
  const { value, title, name } = props;
  console.log(value);
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
