import styles from "./tableRow.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

export default function TableRow({ cells, className, showMobileLabel, style }) {
  return (
    <div className={cn(styles.root, className)} style={style}>
      {cells.map((cell) => {
        return (
          <div
            className={cn(
              styles.cell,
              showMobileLabel ? styles.cellWithLabel : null,
              cell.column.hidden ? styles.isHidden : null,
              cell.column.className
            )}
            {...cell.getCellProps()}
          >
            {showMobileLabel && (
              <div className={cn(typography.delta700, styles.label)}>
                {cell.column.Header}
              </div>
            )}

            {cell.render("Cell")}
          </div>
        );
      })}
    </div>
  );
}
