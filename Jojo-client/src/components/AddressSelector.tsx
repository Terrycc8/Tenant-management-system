import { IonCol, IonSelect, IonSelectOption } from "@ionic/react";

export function AddressSelector(props: {
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
