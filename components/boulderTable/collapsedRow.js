import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import { typography } from "../../styles/utilities";
import cn from "classnames";
import SwipeOut from "../swipeOut/swipeOut";
import styles from "./collapsedRow.module.css";
import Link from "next/link";
import AscentIcon from "../ascentIcon/ascentIcon";

export default function CollapsedRow({ cells }) {
  const { currentLocation, roles } = useContext(AppContext);
  const isAdmin = roles?.includes("admin");

  const ascentCell = cells.find((cell) => cell.column.id === "ascent");
  const holdTypeCell = cells.find((cell) => cell.column.id === "holdType");
  const starWallCell = cells.find((cell) => cell.column.id === "start");
  const endWallCell = cells.find((cell) => cell.column.id === "end");
  const nameCell = cells.find((cell) => cell.column.id === "name");
  const gradeCell = cells.find((cell) => cell.column.id === "grade");

  const boulderId = cells[0].row.original.id;

  return (
    <SwipeOut
      className={styles.root}
      hiddenChildren={
        <div className={styles.ascents}>{ascentCell.render("Cell")}</div>
      }
    >
      <div className={cn(styles.inner, typography.eta)}>
        <div>{holdTypeCell.render("Cell")}</div>

        <div className={styles.meta}>
          <div className={cn(styles.name, styles.metaItem)}>
            {isAdmin && (
              <Link
                href={`/${currentLocation?.url}/admin/boulders/${boulderId}`}
              >
                <a className={styles.editLink}>✏️</a>
              </Link>
            )}

            {nameCell.render("Cell")}
          </div>

          <div className={cn(styles.wallNames, styles.metaItem)}>
            {starWallCell.render("Cell")} > {endWallCell.render("Cell")}
          </div>

          <div className={cn(styles.metaItem)}>{gradeCell.render("Cell")}</div>
        </div>

        <div className={styles.ascent}>
          <AscentIcon type={ascentCell?.value?.type} fill={true} />
        </div>
      </div>
    </SwipeOut>
  );
}
