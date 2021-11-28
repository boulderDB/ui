import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import cn from "classnames";
import styles from "./drawer.module.css";

export const DrawerContext = createContext({});

export default function Drawer({ children, onClose }) {
  const { isOpen, toggle } = useContext(DrawerContext);
  const drawerRef = useRef();

  useClickOutside(drawerRef, () => {
    toggle(false);

    if (onClose) {
      onClose();
    }
  });

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return null;
    }

    document.body.style.overflow = isOpen ? "hidden" : "scroll";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ x: 320 }}
            animate={{
              x: 0,
            }}
            exit={{
              x: 320,
            }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className={cn(styles.root)}
            ref={drawerRef}
          >
            {children}
          </motion.div>

          <motion.div
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.8,
            }}
            exit={{
              opacity: 0,
            }}
            className={cn(
              styles.overlay,
              isOpen ? styles.isVisibleOverlay : null
            )}
          />
        </>
      )}
    </AnimatePresence>
  );
}
