import {
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import TextField from "../textField/textField";
import TableHeader from "../table/tableHeader";
import TableRow from "../table/tableRow";
import styles from "./adminTable.module.css";
import { useEffect } from "react";

export default function AdminTable({ data, columns, onSelectRows }) {
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );

  useEffect(() => {
    if (onSelectRows) {
      onSelectRows(selectedFlatRows.map((item) => item.original.id));
    }
  }, [selectedFlatRows]);

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
