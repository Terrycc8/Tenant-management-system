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
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { createNewRoom, getRoomList, GetRoomListOutput } from '../sdk'
import ExploreContainer from "../components/ExploreContainer";
import { routes } from "../routes";
import ContactListComponent from "../components/ContactList";
import { contactList } from "../contactData";
import { useEffect, useState } from 'react';
import { checkmarkDone, createOutline } from 'ionicons/icons';
// import './Chats.css';
import { formatError } from '../useHook/use-toast'
import { useRef } from 'react';
// import {RedirectUponLogin} from '../components/LoginRedirectGuard';
import { useSelector } from "react-redux";
import { useGetChatQuery } from "../api/chatroomAPI";
import { RootState } from "../RTKstore";
// import { useParams } from "react-router";
// import ContactModal from '../components/ContactModal';

type Props = { token: string | null }


export function ChatroomList() {
	const token = useSelector((state: RootState) => state.auth.token);
	const {
	  data,
	  isFetching,
	  isLoading,
	  error: fetchError,
	  isError,
	} = useGetChatQuery(token);
	const error = fetchError || data?.error;
	// const state
	return (
	  <IonPage>
		<IonHeader>
		  <IonToolbar>
			<IonTitle slot="start" size="large">Chatroom list</IonTitle>
			{/* <IonButton slot="end" fill="clear" onClick={ () => setShowContactModal(true) }> */}
			<IonIcon slot="end" icon={ createOutline } />		 
		 </IonToolbar>
		</IonHeader>
		<IonContent>
		  {isError ? (
			<>error: {String(error)}</>
		  ) : isLoading ? (
			<>loading</>
		  ) : isFetching ? (
			<>Fetching</>
		  ) : !data ? (
			<>no data??</>
		  ) : data.length == 0 ? (
			<>no chatroom yet</>
		  ) : data.length > 0 ? (
			data.map(
			  (chatroom: {
				id: number;
				receiver_id: number;
			  }) => (
				<IonCard
				  key={chatroom.id}
				  routerLink={routes.chat + "/" + chatroom.id}
				>
				  <img src="" alt="" />
				  <IonCardHeader>
					<IonCardTitle>{chatroom.receiver_id}</IonCardTitle>
					{/* <IonCardSubtitle>{chatroom.rent}</IonCardSubtitle> */}
				  </IonCardHeader>
  
				  <IonCardContent>{}</IonCardContent>
				</IonCard>
			  )
			)
		  ) : (
			<>invalid data: {JSON.stringify(data)}</>
		  )}
		</IonContent>
	  </IonPage>
	);
  }


