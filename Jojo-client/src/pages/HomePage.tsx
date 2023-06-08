import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useCallback, useRef } from "react";
import { RootState } from "../RTKstore";
import { onDismiss } from "../slices/createModalSlice";
import { CustomModal } from "../components/customModal";

function HomePage() {
  const dispatch = useDispatch();
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={logOutOnClick}>Logout</IonButton>
        <CustomModal />
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
