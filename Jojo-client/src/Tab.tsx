import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonButton,
  IonButtons,
  IonHeader,
} from "@ionic/react";
import {
  homeOutline,
  mailUnreadOutline,
  addCircleOutline,
  cashOutline,
  chatboxEllipsesSharp,
  chatboxEllipsesOutline,
  personCircle,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import { RedirectX } from "./components/RedirectX";
import { UserOnlyRoute } from "./components/UserOnlyRoute";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import { SignUpPage } from "./pages/SignUpPage";
import { routes } from "./routes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { onPresent } from "./slices/createModalSlice";
import { ErrorPage } from "./pages/ErrorPage";

export function Tab() {
  const dispatch = useDispatch();
  const isShowOnClick = useCallback(() => {
    dispatch(onPresent());
  }, []);
  return (
    <>
      <IonHeader>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
          </IonButton>
          <IonButton>
            <IonIcon
              slot="icon-only"
              icon={personCircle}
              size="large"
            ></IonIcon>
          </IonButton>
        </IonButtons>
      </IonHeader>
      <IonTabs>
        <IonRouterOutlet>
          <Route path={routes.payments} component={PaymentPage}></Route>
          <Route path={routes.events} component={EventsPage}></Route>
          <Route path={routes.home} component={HomePage}></Route>
          {/* <Route path={routes.chat} component={Tab3} /> */}
          <Route component={ErrorPage} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href={routes.home}>
            <IonIcon aria-hidden="true" icon={homeOutline} size="large" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="events" href={routes.events}>
            <IonIcon aria-hidden="true" icon={mailUnreadOutline} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton>
            <IonIcon
              aria-hidden="true"
              icon={addCircleOutline}
              onClick={isShowOnClick}
              size="large"
            />
          </IonTabButton>
          <IonTabButton tab="payment" href={routes.payments}>
            <IonIcon aria-hidden="true" icon={cashOutline} />
            <IonLabel>Payment</IonLabel>
          </IonTabButton>
          <IonTabButton tab="chat" href={routes.chat}>
            {true ? (
              <IonIcon
                aria-hidden="true"
                icon={chatboxEllipsesSharp}
                size="large"
              />
            ) : (
              <IonIcon
                aria-hidden="true"
                icon={chatboxEllipsesOutline}
                size="large"
              />
            )}

            <IonLabel>Chat</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
}
