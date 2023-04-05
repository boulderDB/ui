import { Row } from "@tanstack/react-table";
import { Boulder } from "../../lib/types";
import styles from "./subRow.module.css";
import cx from "classix";
import { Ascents } from "./ascents";

type SubRowProps = {} & Row<Boulder>;

export function SubRow({ original }: SubRowProps) {
  return (
    <div className={cx(styles.root)}>
      <Ascents userAscent={original.userAscent} variant="vertical" />
    </div>
  );
}
