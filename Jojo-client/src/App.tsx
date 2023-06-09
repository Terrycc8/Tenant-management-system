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
import { UserOnlyRoute } from "./components/UserOnlyRoute";
import { RedirectX } from "./components/RedirectX";

import { Tab } from "./pages/Tab";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        {/* <Redirect exact from="/" to={routes.home} /> */}
        <RedirectX path={routes.login} component={<LoginPage />} />
        <RedirectX path={routes.signup} component={<SignUpPage />} />
        <Route path={prefix}>
          <UserOnlyRoute path={prefix} component={<Tab />} />
        </Route>
        <Route component={ErrorPage} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
