import {
  IonButton,
  IonContent,
  IonHeader,
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

function Home() {
  const dispatch = useDispatch();
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
  }, []);
  const isShow = useSelector((state: RootState) => {
    return state.modal.isShow;
  });
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
        <IonModal
          isOpen={isShow}
          trigger="open-modal"
          initialBreakpoint={1}
          breakpoints={[0, 1]}
        >
          <div className="block">Block of Content</div>
        </IonModal>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
}

export default Home;
