import styles from "./tableRow.module.css";
import cn from "classnames";

export default function TableRow({ cells, className }) {
  return (
    <div className={cn(styles.root, className)}>
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
