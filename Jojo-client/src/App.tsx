import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

import Tab2 from "./pages/CreateModalTab";
import Tab3 from "./pages/ChatroomList";

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


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact from="/" to="/home" />
            <Route path={routes.login} component={LoginPage} />
            <Route path={routes.signup} component={SignUpPage} />
            <Route path={routes.home} component={Tab1} />
            <Route path="/add" component={Tab2} />
            <Route path="/chat" component={Tab3} />
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
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
