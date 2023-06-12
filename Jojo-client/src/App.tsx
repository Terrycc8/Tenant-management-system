import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonHeader,
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
  manOutline,
  personCircle,
  square,
  triangle,
} from "ionicons/icons";

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
import { prefix, routes } from "./routes";
import { SignUpPage } from "./pages/SignUpPage";

import { ErrorPage } from "./pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./RTKstore";

import Home from "./pages/HomePage";
import { Profiler, useCallback, useRef, useState } from "react";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import { MemberOnlyRoute } from "./components/MemberOnlyRoute";

import { Tab } from "./pages/Tab";
import { RedirectForMember } from "./components/RedirectForMember";

setupIonicReact();

const App: React.FC = () => {
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const location = localStorage.getItem("location") || routes.home;
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* <Redirect exact from="/" to={routes.home} /> */}
          <RedirectForMember path={routes.login} component={<LoginPage />} />
          {/* <Route path={routes.login}>
            {!token ? (
              <LoginPage />
            ) : (
              <Redirect from={routes.login} to={location} />
            )}
          </Route> */}
          <Route path={routes.signup}>
            {!token ? (
              <SignUpPage />
            ) : (
              <Redirect from={routes.signup} to={location} />
            )}
          </Route>

          <Route path={prefix}>{!token ? <LoginPage /> : <Tab />}</Route>
          <Route>
            <ErrorPage />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
