import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  addCircleOutline,
  cashOutline,
  chatboxEllipses,
  chatboxEllipsesOutline,
  chatboxEllipsesSharp,
  ellipse,
  homeOutline,
  mailUnreadOutline,
  square,
  triangle,
} from "ionicons/icons";

import Tab2 from "./pages/CreateModalTab";
import Tab3 from "./pages/ChatroomList";
import Tab2, { EventsPage } from "./pages/EventsPage";
import Tab3 from "./pages/Chatroom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Tab1 from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { routes } from "./routes";
import { SignUpPage } from "./pages/SignUpPage";

import { ErrorPage } from "./pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./RTKstore";
import {
  RedirectUponLogin,
  RedirectUponSignUp,
} from "./components/LoginRedirectGuard";
import Home from "./pages/HomePage";
import { useCallback, useRef, useState } from "react";
import { onPresent } from "./slices/createModalSlice";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const inShowOnClick = useCallback(() => {
    dispatch(onPresent());
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact from="/" to={routes.home} />
            <Route path={routes.login} component={LoginPage}></Route>
            {/* <RedirectUponLogin fromUrl={routes.login} toUrl={routes.home} /> */}
            <RedirectUponSignUp fromUrl={routes.signup} toUrl={routes.home} />
            <Route path={routes.home} component={HomePage} />
            <Route path={routes.events} component={EventsPage} />
            <Route path={routes.payments} component={PaymentPage} />
            <Route component={ErrorPage} />
            {/* <Route path="/chat" component={Tab3} /> */}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon icon={"homeOutline"} aria-hidden="true"/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/Action">
              <IonIcon icon={"addCircleSharp"} aria-hidden="true"></IonIcon>
              <IonLabel>+</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/chatroom">
              <IonIcon icon={"chatBubblesOutline"} aria-hidden="true" />
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={homeOutline} size="large" />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events">
              <IonIcon aria-hidden="true" icon={mailUnreadOutline} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>
            <IonTabButton>
              <IonIcon
                aria-hidden="true"
                icon={addCircleOutline}
                onClick={inShowOnClick}
                size="large"
              />
            </IonTabButton>
            <IonTabButton tab="payment" href="/payment">
              <IonIcon aria-hidden="true" icon={cashOutline} />
              <IonLabel>Payment</IonLabel>
            </IonTabButton>
            <IonTabButton tab="chat" href="/chat">
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
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
