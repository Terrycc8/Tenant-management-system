import { IonRow, IonCol, IonInput } from "@ionic/react";

export function CustomIonColInput(props: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <IonRow>
      {Array.isArray(props.children)
        ? props.children.map((child, idx) => (
            <IonCol key={idx + 1}>{child}</IonCol>
          ))
        : props.children}
    </IonRow>
  );
}
