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
import { RedirectX } from "../components/RedirectX";
import { UserOnlyRoute } from "../components/UserOnlyRoute";

import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";
import PaymentPage from "./PaymentPage";
import { SignUpPage } from "./SignUpPage";
import { routes } from "../routes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ErrorPage } from "./ErrorPage";

import { CreateModal } from "../components/CreateModal";
import { PropertyPage } from "./PropertyPage";
import { PropertyDetailPage } from "./PropertyDetailPage";
import { EventsPage } from "./EventsPage";

export function Tab() {
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
          <Route exact path={routes.property} component={PropertyPage}></Route>
          <Route
            path={routes.propertyDetail}
            component={PropertyDetailPage}
          ></Route>
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
              id="open-modal"
              aria-hidden="true"
              icon={addCircleOutline}
              // onClick={isShowOnClick}
              size="large"
            />
            <CreateModal />
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
