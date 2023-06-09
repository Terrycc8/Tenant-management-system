import { IonContent, IonCardTitle, IonIcon, IonCol, IonItem, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonText, IonRow } from '@ionic/react';
import { add, camera, pencil } from 'ionicons/icons';
import styles from './Status.module.scss';

const Status = () => {
	return (
		<IonPage className={ styles.statusPage }>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Status</IonTitle>
				</IonToolbar>
                </IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Status</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonItem lines="none" className={ `${ styles.statusAvatar } ion-margin-top` }>
                <img src={"../icon/bill.jpeg"} alt="avatar" />
					<div className={ styles.imageUpload }>
						<IonIcon icon={ add } color="white" />
					</div>
					<IonCol className="ion-padding-start">
						<IonText color="white">
							<strong>My Status</strong>
						</IonText>
						<br />
						<IonText color="medium" className={ styles.smallText }>Add to my status</IonText>
					</IonCol>

					<IonRow className={ styles.statusActions }>
						<IonCol size="6">
							<IonIcon color="primary" icon={ pencil } />
						</IonCol>
					</IonRow>
				</IonItem>
			</IonContent>
		</IonPage>
	);
};

export default Status;

