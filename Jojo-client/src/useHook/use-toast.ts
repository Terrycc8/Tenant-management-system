import { useIonToast } from '@ionic/react'
import { useMemo } from 'react'

export function useToast() {
  const [presentToast, dismissToast] = useIonToast()

  return useMemo(() => {
    function showSuccessMessage(message: string) {
      presentToast({
        message,
        color: 'success',
        duration: 3500,
        buttons: [{ text: 'Dismiss', role: 'cancel', handler: dismissToast }],
      })
    }

    function showErrorMessage(error: Error | string | unknown) {
      presentToast({
        message: formatError(error),
        color: 'danger',
        duration: 5000,
        buttons: [{ text: 'Dismiss', role: 'cancel', handler: dismissToast }],
      })
    }

    return {
      showSuccessMessage,
      showErrorMessage,
    }
  }, [])
}

export function formatError(error: any) {
  return String(error).replace(/\w+:/, '')
}
