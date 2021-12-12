import { useGlobalFilter, useSortBy, useTable } from "react-table";
import TextField from "../textField/textField";
import TableHeader from "../table/tableHeader";
import TableRow from "../table/tableRow";
import styles from "./adminTable.module.css";

export default function AdminTable({ data, columns }) {
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
    <div>
      <div>
        <TextField
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder={"search"}
        />
      </div>

      <div {...getTableProps()} className={styles.table}>
        <TableHeader
          className={styles.header}
          headerGroups={headerGroups}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          }}
        />

        <div {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <TableRow
                showMobileLabel={true}
                className={styles.row}
                cells={row.cells}
                key={`row-${index}`}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
