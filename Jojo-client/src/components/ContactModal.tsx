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
  } from "@ionic/react";
import { ContactStore } from "../store";
import { getContacts } from "../store/Selectors";

import "./ContactModal.scss";

export function ContactModal () {
    const contacts = ContactStore.useState(getContacts);

    return (
        <div style={{ height: "100%" }}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New Chat</IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="clear" onClick={ close }>Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    { contacts.map(contact => {

                        return (

                            <IonItem key={ `contact_${ contact.id }` } lines="full" className="contact-item">
                                <img src={ contact.avatar } alt="contact avatar" />
                                <IonLabel>
                                    <h1>{ contact.name }</h1>
                                    <p>Available</p>
                                </IonLabel>
                            </IonItem>
                        );
                    })}
                </IonList>
            </IonContent>
        </div>
    );
}
