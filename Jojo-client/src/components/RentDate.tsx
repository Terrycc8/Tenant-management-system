import {
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonLabel,
  IonInput,
} from "@ionic/react";

function RentEndDate(props: { name: string; id: string }) {
  const { name, id } = props;
  return (
    <>
      <IonDatetimeButton datetime={id}></IonDatetimeButton>
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          name={name}
          id={id}
          presentation="date"
          showDefaultButtons={true}
        ></IonDatetime>
      </IonModal>
    </>
  );
}
export default RentEndDate;
