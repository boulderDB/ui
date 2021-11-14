import styles from "./table.module.css";
import cn from "classnames";
import { Downward, Upward } from "../icon/icon";

export function TableRow({ cells, className }) {
  return (
    <div className={cn(styles.row, className)}>
      {cells.map((cell, cellIndex) => {
        return (
          <div
            className={cn(styles.cell, cell.column.className)}
            key={`cell-${cellIndex}`}
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </div>
        );
      })}
    </div>
  );
}

export function TableHeader({ headerGroups, className }) {
  return (
    <div className={cn(styles.header, className)}>
      {headerGroups.map((headerGroup) => {
        return headerGroup.headers.map((column, index) => (
          <div
            className={cn(styles.headerCell, column.className)}
            {...column.getHeaderProps(column.getSortByToggleProps())}
            key={`header-cell-${index}`}
          >
            {column.render("Header")}
            <span className={styles.sortIndicator}>
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <Downward />
                ) : (
                  <Upward />
                )
              ) : (
                ""
              )}
            </span>
          </div>
        ));
      })}
    </div>
  );
}
