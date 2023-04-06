import { Row } from "@tanstack/react-table";
import { Rank } from "../../lib/types";
import styles from "./subRow.module.css";
import cx from "classix";

type SubRowProps = {
  onClose: () => void;
} & Row<Rank>;

export function SubRow({ original, onClose }: SubRowProps) {
  return <div className={cx(styles.root)}>sub rnak</div>;
}
