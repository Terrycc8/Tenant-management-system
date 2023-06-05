import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import ExploreContainer from "../components/ExploreContainer";
  
  const Tab3: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 4</IonTitle>
            </IonToolbar>
          </IonHeader>
          

          {/* <ExploreContainer name="Tab 3 page" /> */}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Tab3;
  