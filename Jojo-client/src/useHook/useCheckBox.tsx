import { useCallback, useState } from "react";

export function useCheckBox() {
  const [checked, setChecked] = useState(false);
  const checkBoxOnClick = useCallback(() => {
    setChecked((state) => !state);
  }, []);
  return { checked, checkBoxOnClick };
}
