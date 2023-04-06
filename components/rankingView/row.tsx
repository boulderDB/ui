import { Row, flexRender } from "@tanstack/react-table";
import { Rank } from "../../lib/types";
import { capitalize } from "../../lib/capitalize";
import cx from "classix";
import styles from "./row.module.css";

type RowProps = {} & Row<Rank>;

export function Row({ id, getVisibleCells }: RowProps) {
  return (
    <div key={id} className={cx(styles.root)}>
      {getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          className={cx(
            styles.cell,
            styles[`is${capitalize(cell.column.id)}Cell`]
          )}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}
