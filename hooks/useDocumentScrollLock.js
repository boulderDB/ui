import { useEffect, useLayoutEffect, useRef } from "react";

const maybeDocument = typeof document !== "undefined" ? document : {};

export default function useDocumentScrollLock({
  disableOnMount = true,
  reEnableOnUnmount = true,
} = {}) {
  const isLockedRef = useRef(false);
  const { body, documentElement } = maybeDocument;

  const disableScroll = () => {
    if (!body || !body.style || isLockedRef.current) {
      return;
    }

    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    isLockedRef.current = true;
  };

  const enableScroll = () => {
    if (!body || !body.style || !isLockedRef.current) {
      return;
    }

    documentElement.style.overflow = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    isLockedRef.current = false;
  };

  useEffect(() => {
    disableOnMount && disableScroll();
    return () => reEnableOnUnmount && enableScroll();
  }, []);

  return [disableScroll, enableScroll];
}
