import {
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { memo } from "react";

function RentEndDate(props: {
  value?: string;
  readonly?: boolean;
  name: string;
  id: string;
}) {
  const { name, id } = props;

  return (
    <>
      <IonDatetimeButton
        datetime={id}
        disabled={props.readonly || false}
      ></IonDatetimeButton>
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          name={name}
          id={id}
          presentation="date"
          showDefaultButtons={true}
          value={props.value}
        ></IonDatetime>
      </IonModal>
    </>
  );
}
export default memo(RentEndDate);
