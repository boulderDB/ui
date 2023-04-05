import { Row, flexRender } from "@tanstack/react-table";
import { Boulder } from "../../lib/types";
import { capitalize } from "../../lib/capitalize";
import cx from "classix";
import styles from "./row.module.css";
import utilities from "../../styles/utilities/utilities";

type RowProps = {
  collapsed: boolean;
} & Row<Boulder>;

export function Row({ collapsed, id, getVisibleCells }: RowProps) {
  if (!collapsed) {
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

  const selectCell = getVisibleCells().find(
    (cell) => cell.column.id === "select"
  );

  const holdTypeCell = getVisibleCells().find(
    (cell) => cell.column.id === "holdType"
  );

  const nameCell = getVisibleCells().find((cell) => cell.column.id === "name");

  const startWallCell = getVisibleCells().find(
    (cell) => cell.column.id === "startWall"
  );

  const endWall = getVisibleCells().find(
    (cell) => cell.column.id === "endWall"
  );

  const expanderCell = getVisibleCells().find(
    (cell) => cell.column.id === "expander"
  );

  return (
    <div key={id} className={cx(styles.root)}>
      {holdTypeCell
        ? flexRender(
            holdTypeCell.column.columnDef.cell,
            holdTypeCell.getContext()
          )
        : null}

      <div className={styles.container}>
        <div className={cx(styles.header, utilities.typograpy.delta700)}>
          {selectCell
            ? flexRender(
                selectCell.column.columnDef.cell,
                selectCell.getContext()
              )
            : null}

          <div className={cx(utilities.typograpy.delta700, styles.name)}>
            {nameCell
              ? flexRender(
                  nameCell.column.columnDef.cell,
                  nameCell.getContext()
                )
              : null}
          </div>
        </div>

        <div className={cx(styles.walls, utilities.typograpy.delta)}>
          {startWallCell
            ? flexRender(
                startWallCell.column.columnDef.cell,
                startWallCell.getContext()
              )
            : null}

          <span>&nbsp;{">"}&nbsp;</span>

          {endWall
            ? flexRender(endWall.column.columnDef.cell, endWall.getContext())
            : null}
        </div>
      </div>

      {expanderCell
        ? flexRender(
            expanderCell.column.columnDef.cell,
            expanderCell.getContext()
          )
        : null}
    </div>
  );
}
