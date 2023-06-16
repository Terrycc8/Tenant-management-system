import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonHeader,
  useIonAlert,
  IonCard,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
// import "./ContactModal.scss";
import { FormEvent, useCallback, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { useGetUsersQuery } from "../api/loginMutation";
import { closeOutline } from "ionicons/icons";
import { UserListOutput, PropertyListOutput } from "../types";
import { routes } from "../routes";
import serverURL from "../ServerDomain";
import { log } from "console";

export function ContactModalBk() {
  // const token = useSelector((state: RootState) => state.auth.token);
  // const { data, isFetching, isLoading, error } = useContactList(token);

  // const [presentAlert] = useIonAlert();
  const contactModal = useRef<HTMLIonModalElement>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const [data, setData] = useState([]);
  //   const {
  //     data,
  //     isFetching,
  //     isLoading,
  //     error: fetchError,
  //     isError,
  //   } = useGetUsersQuery(token);

  //   const error = fetchError || data?.error;
  const dismissContact = useCallback(() => {
    contactModal.current?.dismiss();
  }, [contactModal]);

  async function getUserList() {
    const res = await fetch(`${serverURL}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    console.log(result);

    setData(result);
  }

  useEffect(() => {
    token && getUserList();
  }, [token]);

  //   const { mutate, isLoading } = useMutation(createEmployee, {
  //     onSuccess: data => {
  //        console.log(data);
  //        const message = "success"
  //        presentAlert(message)

  //   if ("error" in json) {
  //     presentAlert({
  //       header: (json.error as FetchError).data.message,
  //       buttons: [
  //         {
  //           text: "OK",
  //           role: "confirm",
  //           handler: dismissProperty,
  //         },
  //       ],
  //     });
  //   } else {
  //     presentAlert({
  //       header: "Successful",
  //       buttons: [
  //         {
  //           text: "OK",
  //           role: "confirm",
  //           handler: dismissProperty,
  //         },
  //       ],

  return (
    <IonModal
      ref={contactModal}
      trigger="open-contact-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissContact}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Contact</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={dismissContact}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {data.length == 0 ? (
          <>no contact yet, please add contact</>
        ) : (
          data.map((user: UserListOutput) => (
            <IonCard key={user.id} routerLink={routes.chatroom(user.id)}>
              <IonCardHeader>
                <IonCardTitle>
                  {user.avatar + user.first_name + " " + user.last_name}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))
        )}

        {/* {isError ? (
          <>error: {String(error)}</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : !data ? (
          <>no data??</>
        ) : data.length == 0 ? (
          <>no contact yet, please add contact</>
        ) : data.length > 0 ? (
          data.map((user: UserListOutput) => (
            <IonCard
              key={user.id}
              // routerLink={routes.chat + "/" + chatroom.id}
            >
              <IonCardHeader>
                <IonCardTitle>
                  {user.avatar + user.first_name + " " + user.last_name}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))
        ) : (
          // <IonList>

          //     return (

          //         <IonItem key={ `contact_${ contact.id }` } lines="full" className="contact-item">
          //             <img src={ contact.avatar } alt="contact avatar" />
          //             <IonLabel>
          //                 <h1>{ contact.name }</h1>
          //                 <p>{ status }</p>
          //             </IonLabel>
          //         </IonItem>
          //     );

          //  </IonList>
          <>Invalid Data: {JSON.stringify(data)}</>
        )} */}
      </IonContent>
    </IonModal>
  );
}
