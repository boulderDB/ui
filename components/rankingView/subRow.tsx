import { Cell, Row, flexRender } from "@tanstack/react-table";
import { Rank } from "../../lib/types";
import styles from "./subRow.module.css";
import cx from "classix";

type SubRowProps = {
  onClose: () => void;
} & Row<Rank>;

export function SubRow({ getVisibleCells }: SubRowProps) {
  const columns = [
    getVisibleCells().find((cell) => cell.column.id === "boulders"),
    getVisibleCells().find((cell) => cell.column.id === "points"),
    getVisibleCells().find((cell) => cell.column.id === "flashed"),
    getVisibleCells().find((cell) => cell.column.id === "topped"),
    getVisibleCells().find((cell) => cell.column.id === "gender"),
    getVisibleCells().find((cell) => cell.column.id === "lastActivity"),
  ] as Cell<Rank, unknown>[];

  return (
    <div className={cx(styles.root)}>
      {columns.map((column) => (
        <div>
          <span>
            {typeof column.column?.columnDef?.header === "function"
              ? column.column?.columnDef?.header("xxx")
              : null}
          </span>
          {flexRender(column.column.columnDef.cell, column.getContext())}
        </div>
      ))}
    </div>
  );
}
