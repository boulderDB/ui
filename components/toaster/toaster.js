import styles from "./toaster.module.css";
import { typography } from "../../styles/utilities";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import capitalize from "../../utilties/capitalize";
import { useEffect } from "react";

function Toast({ type = "info", title, description }) {
  return (
    <motion.li
      positionTransition
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(styles.root, styles[`is${capitalize(type)}`])}
    >
      <h3 className={cn(styles.title, typography.epsilon)}>{title}</h3>

      {description && (
        <p className={cn(styles.description, typography.eta)}>{description}</p>
      )}
    </motion.li>
  );
}

function Toaster({ message }) {
  return (
    <ul className={styles.list}>
      <AnimatePresence initial={false}>
        {message && <Toast {...message} />}
      </AnimatePresence>
    </ul>
  );
}

export default Toaster;
