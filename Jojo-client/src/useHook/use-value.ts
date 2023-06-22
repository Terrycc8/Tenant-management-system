import { useState } from "react";

export function useValue<T>(initialValue: T) {
  const [value, update] = useState(initialValue);
  function onIonChange(e: { detail: { value?: any } }) {
    update(e.detail.value);
  }

  function clear() {
    update("" as any);
  }
  return { value, update, onIonChange, clear };
}
