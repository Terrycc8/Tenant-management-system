import { IonCol, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PropertyListOutput } from "../pages/types";

export function CustomSelector(props: {
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
      >
        {value.map((item, idx) => (
          <IonSelectOption value={item[0]} key={idx + 1}>
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
            <IonLabel>No associated property.</IonLabel>
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
