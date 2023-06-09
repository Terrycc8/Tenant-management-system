import {
  IonButton,
  IonContent,
  IonFooter,
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
import { CustomModal } from "../components/CustomModal";
import { routes } from "../routes";

function HomePage() {
  const dispatch = useDispatch();
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CustomModal />
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
      <IonFooter>
        <IonButton
          onClick={logOutOnClick}
          routerLink={routes.login}
          className="ion-margin"
        >
          Logout
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}

export default HomePage;
