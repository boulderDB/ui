import styles from "./section.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

export default function Section({ title, separator = true, children }) {
  return (
    <>
      <section className={styles.root}>
        <h3 className={cn(typography.epsilon, styles.title)}>{title}</h3>
        {children}

        {separator && <div className={styles.separator} />}
      </section>
    </>
  );
}
