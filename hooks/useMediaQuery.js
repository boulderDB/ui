import { useEffect, useRef, useState } from "react";
import { customMedia } from "../styles/cssExports.js";

export default function useMediaQuery(queryOrCustomMedia, onChange) {
  const query = customMedia?.[`--${queryOrCustomMedia}`] || queryOrCustomMedia;
  const [state, setState] = useState({ matches: null });
  const clearRef = useRef(() => {});

  useEffect(() => {
    clearRef.current();
    if (typeof window === "undefined") {
      return clearRef.current;
    }
    const mediaQuery = window.matchMedia(query);
    const handler = (...args) => {
      const [event] = args;

      if (onChange) {
        onChange(...args);
      }

      setState({
        matches: event.matches,
      });
    };
    mediaQuery.addEventListener("change", handler);
    clearRef.current = () => mediaQuery.addEventListener("change", handler);
    handler(mediaQuery);
    return clearRef.current;
  }, [query]);

  return state;
}
