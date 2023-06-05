import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonLabel,
    IonInput,
    IonButton,
    IonCheckbox,
  } from "@ionic/react";
  import ExploreContainer from "./ExploreContainer";
  
  const LoginPage: React.FC = () => {
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
              <IonTitle size="large">Login Page</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput type="text"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password"></IonInput>
            </IonItem>
          </IonList>
          <IonItem lines="none">
            <IonLabel>Remember me</IonLabel>
            <IonCheckbox defaultChecked={true} slot="start" />
          </IonItem>
          <IonButton type="submit" expand="block">Login</IonButton>
          <IonButton type="submit" expand="block">Register</IonButton>
          {/* <ExploreContainer name="Tab 3 page" /> */}
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginPage;
  