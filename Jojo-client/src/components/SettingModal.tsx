import { IonContent, IonHeader, IonModal } from "@ionic/react";
import { memo, useCallback, useRef } from "react";

export const SettingModal = memo(() => {
  const settingModal = useRef<HTMLIonModalElement>(null);
  const dismissSetting = useCallback(() => {
    settingModal.current?.dismiss();
  }, [settingModal]);
  return (
    <IonModal
      ref={settingModal}
      trigger="open-setting-modal"
      onWillDismiss={dismissSetting}
    >
      <IonHeader></IonHeader>
      <IonContent>123</IonContent>
    </IonModal>
  );
});
