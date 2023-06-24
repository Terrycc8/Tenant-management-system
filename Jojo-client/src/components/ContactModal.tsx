import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonAvatar,
} from "@ionic/react";
import { useCallback, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { closeOutline, personCircle } from "ionicons/icons";
import { UserListOutput } from "../types";
import { routes } from "../routes";
import serverURL from "../ServerDomain";
// import { Room } from "../../../Jojo-server/dist/src/proxy";
import { useHistory } from "react-router-dom";
import style from "../theme/menu.module.scss";

export function ContactModal(props: { trigger: string }) {
  const contactModal = useRef<HTMLIonModalElement>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const history = useHistory();
  const [data, setData] = useState([]);

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

  async function getChatroom(user_id: number) {
    // console.log({ user_id });
    const res = await fetch(`${serverURL}/chat/rooms/${user_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const chatroomId = await res.json();
    if (chatroomId) {
      history.push(`/chat/${chatroomId}`);
    }
  }

  return (
    <IonModal
      ref={contactModal}
      trigger={props.trigger}
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
          <>no contact yet, please add contact first</>
        ) : (
          data.map((user: UserListOutput) => (
            <IonCard
              key={user.id}
              // routerLink={routes.chatroom(user.id)}
              onClick={() => getChatroom(user.id)}
            >
              <IonCardHeader>
                <IonCardTitle>
                  <div>
                    {user &&
                    typeof user.avatar == "string" &&
                    user.avatar.length > 0 ? (
                      <IonAvatar className={style.profilePicEdit}>
                        <img
                          className={style.test11}
                          src={serverURL + "/" + user.avatar}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              serverURL + "/defaultProfilePic.Png";
                          }}
                        />
                      </IonAvatar>
                    ) : (
                      <IonIcon
                        className={style.profilePicEdit}
                        slot="icon-only"
                        icon={personCircle}
                      ></IonIcon>
                    )}
                  </div>
                  {user.first_name + " " + user.last_name}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonModal>
  );
}
