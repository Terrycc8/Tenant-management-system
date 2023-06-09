import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonModal,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { routes } from "../routes";
import ContactListComponent from "../components/ContactList";
import { contactList } from "../contactData";
import { useEffect, useState } from 'react';
import { checkmarkDone, createOutline } from 'ionicons/icons';
import './Chats.css';
import { ChatStore, ContactStore } from '../store';
import { getContacts, getChats } from '../store/Selectors';
import ChatItem from '../components/ChatItem';
import { useRef } from 'react';


const Chats = () => {

	const pageRef = useRef();
	const contacts = ContactStore.useState(getContacts);
	const latestChats = ChatStore.useState(getChats);

	const [ results, setResults ] = useState(latestChats);
	const [ showContactModal, setShowContactModal ] = useState(false);

	useEffect(() => {

		setResults(latestChats);
	}, [ latestChats ]);

	const search = (e: React.ChangeEvent<HTMLInputElement>) => {

		const searchTerm = e.currentTarget.value;

		if (searchTerm !== "") {

			const searchTermLower = searchTerm.toLowerCase();

      const newResults = latestChats.filter(chat => { 
        const contact = contacts.find(c => c.id === chat.contact_id);
        if (contact) {
          return contact.name.toLowerCase().includes(searchTermLower);
        }
        return false;
      });
      setResults(newResults);
    } else {
      setResults(latestChats);
    }
  }

	return (
		<IonPage ref={ pageRef }>
			<IonHeader>
				<IonToolbar>
        <IonLabel slot="start" size="large">Chats</IonLabel>	
					<IonButton slot="end">
						<IonButton fill="clear" onClick={ () => setShowContactModal(true) }>
							<IonIcon icon={ createOutline } />
						</IonButton>
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonSearchbar onIonChange={ e => search(e) } />
				</IonHeader>


				{ results.map((chat:string, index) => {

					return <ChatItem chat={ chat } key={ index } />;
				})}

				<IonModal isOpen={ showContactModal } swipeToClose={ true } presentingElement={ pageRef.current } onDidDismiss={ () => setShowContactModal(false) }>
      				<ContactModal close={ () => setShowContactModal(false) } />
    			</IonModal>
			</IonContent>
		</IonPage>
	);
};

export default Chats;