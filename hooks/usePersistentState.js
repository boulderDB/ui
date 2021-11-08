import { useState, useEffect } from "react";
import getLocalStorage from "../utilties/getLocalStorage";

export default function usePersistentState(key, defaultValue) {
  const storageValue = getLocalStorage()?.getItem(key);
  let current = null;

  if (storageValue && storageValue !== "null" && storageValue !== "undefined") {
    current = JSON.parse(getLocalStorage()?.getItem(key));
  }

  const [state, setState] = useState(current || defaultValue);

  useEffect(() => {
    getLocalStorage()?.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
