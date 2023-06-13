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
  } from "@ionic/react";
// import "./ContactModal.scss";
import { FormEvent, useCallback, useRef,useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { useGetUsersQuery } from "../api/loginMutation";
import { closeOutline } from "ionicons/icons";

export function ContactModal() {
    
    const [presentAlert] = useIonAlert();
    const contactModal = useRef<HTMLIonModalElement>(null);
    const dismissProperty = useCallback(() => {
      contactModal.current?.dismiss();
    }, []);
  
    const token = useSelector((state: RootState) => state.auth.token);
    const { data } = useGetUsersQuery(token); 
    const dismissContact = useCallback(() => {
        contactModal.current?.dismiss();
      }, []);


    // const [newProperty] = usePostPropertyMutation();
  
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
                        <IonButton fill="clear" onClick={ dismissContact }>
                            <IonIcon icon={closeOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>

                        return (

                            {/* <IonItem key={ `contact_${ contact.id }` } lines="full" className="contact-item">
                                <img src={ contact.avatar } alt="contact avatar" />
                                <IonLabel>
                                    <h1>{ contact.name }</h1>
                                    <p>{ status }</p>
                                </IonLabel>
                            </IonItem> */}
                        );
           
                </IonList>
            </IonContent>
        </IonModal>
    );
}
