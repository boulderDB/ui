import cn from "classnames";
import { Downward, Upward } from "../icon/icon";
import styles from "./tableHeader.module.css";

export default function TableHeader({ headerGroups, className }) {
  return (
    <div className={cn(styles.root, className)}>
      {headerGroups.map((headerGroup, groupIndex) => {
        return headerGroup.headers.map((column, index) => (
          <div
            className={cn(styles.cell, column.className)}
            {...column.getHeaderProps(column.getSortByToggleProps())}
            key={`header-cell-${index}-${groupIndex}`}
          >
            {column.render("Header")}

            <span className={styles.indicator}>
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
