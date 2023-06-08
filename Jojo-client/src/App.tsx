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
import { ellipse, square, triangle } from "ionicons/icons";

import Tab2 from "./pages/CreateModalTab";
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
import Tab1 from "./pages/HomeTab";
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
import Home from "./pages/HomeTab";
import { useCallback, useRef, useState } from "react";
import { setIsShow } from "./slices/modalSlice";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const inShowOnClick = useCallback(() => {
    dispatch(setIsShow());
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
            <Route path={routes.home} component={Home} />
            <Route path="/add" component={Tab2} />
            {/* <Route path="*" component={ErrorPage} /> */}
            {/* <Route path="/chat" component={Tab3} /> */}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events">
              <IonIcon aria-hidden="true" icon={ellipse} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>
            <IonTabButton>
              <IonButton onClick={inShowOnClick}>+</IonButton>
            </IonTabButton>
            <IonTabButton tab="payment" href="/payment">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Payment</IonLabel>
            </IonTabButton>
            <IonTabButton tab="chat" href="/chat">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
