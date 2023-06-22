import { useEffect, useState } from "react";

export let token = "";

export function setToken(value: string) {
  token = value;
}

export function useAuth() {
  const [state, setState] = useState(0);
  useEffect(() => {
    function update() {
      setState((state) => state + 1);
    }
    window.addEventListener("auth-update", update);
    return () => {
      window.removeEventListener("auth-update", update);
    };
  }, []);
}
