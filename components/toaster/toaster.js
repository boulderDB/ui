import styles from "./toaster.module.css";
import { textStyles } from "../../styles/utilities";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import capitalize from "../../utilties/capitalize";

function Toast({ type = "info", title, description }) {
  return (
    <motion.li
      positionTransition
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(styles.root, styles[`is${capitalize(type)}`])}
    >
      <h3 className={cn(styles.title, textStyles.epsilon)}>{title}</h3>

      {description && (
        <p className={cn(styles.description, textStyles.eta)}>{description}</p>
      )}
    </motion.li>
  );
}

function Toaster({ queue }) {
  return (
    <ul className={styles.list}>
      <AnimatePresence initial={false}>
        {queue.map((item, index) => (
          <Toast {...item} key={index} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default Toaster;
