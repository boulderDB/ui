import styles from "./bar.module.css";
import { PropsWithChildren } from "react";
import { cx } from "classix";
import { Transition } from "@headlessui/react";
import { capitalize } from "../../lib/capitalize";

type BarProps = {
  visible: boolean;
  className?: string;
  variant: "default" | "danger";
};

export default function Bar({
  visible,
  className,
  variant = "default",
  children,
}: PropsWithChildren<BarProps>) {
  return (
    <Transition
      show={visible}
      as={"div"}
      enter={styles.enter}
      enterFrom={styles.isHidden}
      enterTo={styles.isVisible}
      leave={styles.leave}
      leaveFrom={styles.isVisible}
      leaveTo={styles.isHidden}
      className={cx(styles.root, styles[`is${capitalize(variant)}`], className)}
    >
      {children}
    </Transition>
  );
}
