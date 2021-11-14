import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { useMemo } from "react";
import { TableHeader, TableRow } from "../table/table";
import TextField from "../textField/textField";
import Avatar from "../avatar/avatar";
import styles from "./rankingTable.module.css";

export function UserRank({ image, username, sentAllBoulders = false }) {
  return (
    <>
      <Avatar image={image} />
      <span className={styles.rankUsername}>{username}</span>
      {sentAllBoulders && <span className={styles.rankBadge}>🥋</span>}
    </>
  );
}

export function RankingTable({ columns, data, rowClassName, headerClassName }) {
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

  const gridTemplateColumns = useMemo(() => {
    return columns.map((column) => column.gridTemplate).join(" ");
  }, [columns]);

  return (
    <>
      <div>
        <TextField
          onChange={(event) => setGlobalFilter(event.target.value)}
          onClear={() => setGlobalFilter("")}
          placeholder={"search"}
        />
      </div>

      <div {...getTableProps()}>
        <TableHeader
          className={headerClassName}
          headerGroups={headerGroups}
          gridTemplateColumns={gridTemplateColumns}
        />

        <div {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <TableRow
                className={rowClassName}
                gridTemplateColumns={gridTemplateColumns}
                cells={row.cells}
                key={`row-${index}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
