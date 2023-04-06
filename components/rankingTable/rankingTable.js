import Avatar from "../avatar/avatar";
import styles from "./rankingTable.module.css";
import TableHeader from "../table/tableHeader";
import TableRow from "../table/tableRow";
import { Input } from "../input/input";
import utilities from "../../styles/utilities/utilities";
import { Fragment } from "react";

export function UserRank({ image, username, sentAllBoulders = false }) {
  return (
    <div className={styles.rank}>
      <Avatar image={image} />

      <span className={styles.rankUsername}>{username}</span>

      {sentAllBoulders && <span className={styles.rankBadge}>🥋</span>}
    </div>
  );
}

const subRows = [
  {
    id: "total.count",
    label: "Boulder",
  },
  {
    id: "points",
    label: "Points",
  },
  {
    id: "flash.count",
    label: "Flashed",
  },
  {
    id: "top.count",
    label: "Topped",
  },
  {
    id: "user.gender",
    label: "Gender",
  },
  {
    id: "user.lastActivity",
    label: "Last activity",
  },
];

function Sub({ isExpanded, row }) {
  if (!isExpanded) {
    return null;
  }

  return (
    <div className={styles.sub}>
      {subRows.map((subRow) => (
        <div key={row.id} className={styles.subRow}>
          <span className={utilities.typograpy.delta700}>{subRow.label}:</span>

          <span className={utilities.typograpy.delta}>
            {row.cells
              .find((cell) => cell.column.id === subRow.id)
              .render("Cell")}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RankingTable({
  columns,
  data,
  rowClassName,
  headerClassName,
  className,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded
  );

  return (
    <div className={className}>
      <Input
        className={styles.search}
        placeholder="Search"
        onChange={(value) => setGlobalFilter(value)}
      />

      <div {...getTableProps()} className={styles.table}>
        <TableHeader className={headerClassName} headerGroups={headerGroups} />

        <div {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <Fragment key={index}>
                <TableRow
                  className={rowClassName}
                  cells={row.cells}
                  key={`row-${index}`}
                />

                <Sub isExpanded={row.isExpanded} row={row} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
