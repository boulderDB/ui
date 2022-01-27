import { useTable, useGlobalFilter, useSortBy } from "react-table";
import TextField from "../textField/textField";
import Avatar from "../avatar/avatar";
import styles from "./rankingTable.module.css";
import TableHeader from "../table/tableHeader";
import TableRow from "../table/tableRow";

export function UserRank({ image, username, sentAllBoulders = false }) {
  return (
    <div className={styles.rank}>
      <Avatar image={image} />
      <span className={styles.rankUsername}>{username}</span>
      {sentAllBoulders && <span className={styles.rankBadge}>🥋</span>}
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
    useSortBy
  );

  return (
    <div className={className}>
      <div>
        <TextField
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder={"search"}
        />
      </div>

      <div {...getTableProps()} className={styles.table}>
        <TableHeader className={headerClassName} headerGroups={headerGroups} />

        <div {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <TableRow
                className={rowClassName}
                cells={row.cells}
                key={`row-${index}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
