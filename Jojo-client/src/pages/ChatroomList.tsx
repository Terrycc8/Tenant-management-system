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
import { createNewRoom, getRoomList, GetRoomListOutput } from "../sdk";
import ExploreContainer from "../components/ExploreContainer";
import { routes } from "../routes";
import ContactListComponent from "../components/ContactList";
import { contactList } from "../contactData";
import { useEffect, useState } from "react";
import { checkmarkDone, createOutline } from "ionicons/icons";
// import './Chats.css';
import { formatError } from "../useHook/use-toast";
import { useRef } from "react";
// import {RedirectUponLogin} from '../components/LoginRedirectGuard';
import { useSelector } from "react-redux";
import { useGetChatQuery } from "../api/chatroomAPI";
import { RootState } from "../RTKstore";
// import { useParams } from "react-router";
// import ContactModal from '../components/ContactModal';

type Props = { token: string | null };

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
          <IonTitle>Chatroom list</IonTitle>
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
          data.map((chatroom: { id: number; receiver_id: number }) => (
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
          ))
        ) : (
          <>invalid data: {JSON.stringify(data)}</>
        )}
      </IonContent>
    </IonPage>
  );
}

// class ChatroomList extends React.Component<Props> {
// 	state = {
// 	  rooms: [] as GetRoomListOutput['rooms'],
// 	  error: '',
// 	  showContactModal: false,
// 	  newRoomTitle: '',
// 	  isCreatingRoom: false,
// 	}

// 	async componentDidMount() {
// 	  if (this.props.token) {
// 		this.loadRoomList(this.props.token)
// 	  }
// 	}

// 	componentDidUpdate(
// 	  prevProps: Readonly<Props>,
// 	  prevState: Readonly<{}>,
// 	  snapshot?: any,
// 	): void {
// 	  if (this.props.token && !prevProps.token) {
// 		this.loadRoomList(this.props.token)
// 	  }
// 	}

// 	async loadRoomList(token: string) {
// 	  try {
// 		let json = await getRoomList({ token })
// 		this.setState({
// 		  rooms: json.rooms,
// 		  error: '',
// 		})
// 	  } catch (error) {
// 		this.setState({ error: formatError(error) })
// 	  }
// 	}

// 	// useEffect(() => {

// 	// 	setResults(latestChats);
// 	// }, [ latestChats ]);

// 	// const search = (e: CustomEvent) => {

// 	// 	const searchTerm = e.target.value;

// 	// 	if (searchTerm !== "") {

// 	// 		const searchTermLower = searchTerm.toLowerCase();

// 	// 		const newResults = latestChats.filter(chat => contacts.filter((c: Contact) => c.id === chat.contact_id)[0].name.toLowerCase().includes(searchTermLower));
// 	// 		setResults(newResults);
// 	// 	} else {

// 	// 		setResults(latestChats);
// 	// 	}
// 	// }

// 	showContactModal = () => {
// 	  this.setState({ showContactModal: true })
// 	}

// 	hideContactModal = () => {
// 	  this.setState({ showContactModal: false })
// 	}

// 	createRoom = async () => {
// 	  try {
// 		this.setState({ isCreatingRoom: true })
// 		let token = this.props.token
// 		if (!token) return
// 		let json = await createNewRoom({
// 		  token,
// 		  title: this.state.newRoomTitle,
// 		})
// 		this.hideContactModal()
// 		let newRoom: GetRoomListOutput['rooms'][number] = {
// 		  id: json.id,
// 		  title: this.state.newRoomTitle,
// 		  created_by: json.created_by,
// 		  user_id: json.user_id,
// 		}
// 		this.setState({
// 		  rooms: [newRoom, ...this.state.rooms],
// 		  error: '',
// 		})
// 	  } catch (error) {
// 		this.setState({ error: formatError(error) })
// 	  } finally {
// 		this.setState({ isCreatingRoom: false })
// 	  }
// 	}

// 	render() {
// 	//   const token = this.props.token
// 	//   if (!token) {
// 	// 	return (
// 	// 	  <IonPage>
// 	// 		<IonHeader>
// 	// 		  <IonToolbar>
// 	// 			<IonTitle>Chats</IonTitle>
// 	// 		  </IonToolbar>
// 	// 		</IonHeader>
// 	// 		<IonContent className="ion-padding">
// 	// 		  <RedirectUponLogin />
// 	// 		</IonContent>
// 	// 	  </IonPage>
// 	// 	)
// 	//   }

// 	return (
// 		<IonPage>
// 			<IonHeader>
// 				<IonToolbar>
//         			<IonTitle slot="start" size="large">Chats</IonTitle>
// 						{/* <IonButton slot="end"> */}
// 							<IonButton slot="end" fill="clear" onClick={ () => setShowContactModal(true) }>
// 								<IonIcon icon={ createOutline } />
// 							{/* </IonButton> */}
// 						</IonButton>
// 				</IonToolbar>
// 			</IonHeader>
// 			<IonContent fullscreen>
// 				<IonHeader collapse="condense">
// 					<IonSearchbar onIonChange={ (e) => search(e) } />
// 				</IonHeader>

// 				{ results.map((chat:string, index) => {

// 					return <ChatItem chat={ chat } key={ index } />;
// 				})}

// 				<IonModal isOpen={ showContactModal } swipeToClose={ true } presentingElement={ pageRef.current } onDidDismiss={ () => setShowContactModal(false) }>
//       				<ContactModal close={ () => setShowContactModal(false) } />
//     			</IonModal>
// 			</IonContent>
// 		</IonPage>
// 	);
// };

// export default Chats;
