import cn from "classnames";
import { Downward, Upward } from "../icon/icon";
import styles from "./tableHeader.module.css";

export default function TableHeader({ headerGroups, className, style }) {
  return (
    <div className={cn(styles.root, className)} style={style}>
      {headerGroups.map((headerGroup) => {
        return headerGroup.headers
          .filter((column) => !column.hidden)
          .map((column) => (
            <div
              key={column.id}
              className={cn(styles.cell, column.className)}
              {...column.getHeaderProps(column.getSortByToggleProps())}
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
