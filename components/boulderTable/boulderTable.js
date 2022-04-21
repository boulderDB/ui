import { useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useRowSelect,
  useAsyncDebounce,
} from "react-table";
import styles from "./boulderTable.module.css";
import TableHeader from "../table/tableHeader";
import TableRow from "../table/tableRow";
import IndeterminateCheckbox from "../table/IndeterminateCheckbox";
import Pagination from "../../components/pagination/pagination";
import Grade from "../grade/grade";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import { optionRenderers } from "../entitySelect/entitySelect";
import { parseDate } from "../../utilties/parseDate";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customMedia } from "../../styles/cssExports";

export const ascentTypes = [
  {
    id: "todo",
    name: "Todo",
  },
  {
    id: "flash",
    name: "Flash",
  },
  {
    id: "top",
    name: "Top",
  },
  {
    id: "resignation",
    name: "Resignation",
  },
];

export default function BoulderTable({
  columns,
  data,
  onSelectRows,
  onFilter = (rows) => null,
  globalFilter,
  filters,
  rowClassName,
  headerClassName,
  collapsedRowRenderer,
}) {
  const isTabletOrMobile = useMediaQuery(customMedia?.[`--m-to-s`], {
    noSsr: true,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setAllFilters,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize },
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50, filters },
      autoResetGlobalFilter: false,
      autoResetFilters: false,
      autoResetSortBy: false,
      autoResetPage: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const onGlobalFilterChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  useEffect(() => {
    onGlobalFilterChange(globalFilter);
  }, [globalFilter]);

  useEffect(() => {
    setAllFilters(filters);
  }, [filters]);

  useEffect(() => {
    onFilter(rows);
  }, [rows]);

  useEffect(() => {
    if (onSelectRows) {
      onSelectRows(selectedFlatRows.map((item) => item.original.id));
    }
  }, [selectedFlatRows]);

  return (
    <>
      <div className={cn(styles.root, typography.epsilon)} {...getTableProps()}>
        <TableHeader className={headerClassName} headerGroups={headerGroups} />

        <div {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);

            if (isTabletOrMobile && collapsedRowRenderer) {
              return collapsedRowRenderer(row.cells);
            }

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

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageOptions.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}

export const columns = {
  selection: {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      </>
    ),
  },
  holdType: {
    id: "holdType",
    accessor: "holdType",
    Header: "Hold",
    sortType: (a, b) => {
      return a.values.holdType.name > b.values.holdType.name ? -1 : 1;
    },
    filter: (rows, id, filterValue) => {
      return rows.filter((row) => {
        return row.values[id].name === filterValue;
      });
    },
  },
  grade: {
    id: "grade",
    accessor: "grade",
    Header: "Grade",
    sortType: (a, b) => {
      const gradeA = a.values.grade.internal
        ? a.values.grade.internal.name
        : a.values.grade.name;
      const gradeB = b.values.grade.internal
        ? b.values.grade.internal.name
        : b.values.grade.name;

      return gradeA > gradeB ? -1 : 1;
    },
    filter: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id].internal
          ? row.values[id].internal.name
          : row.values[id].name;

        return rowValue === filterValue;
      });
    },
  },
  points: {
    id: "points",
    accessor: "currentPoints",
    Header: "Points",
    sortType: (a, b) => {
      return a.values.points > b.values.points ? -1 : 1;
    },
  },
  name: {
    id: "name",
    accessor: "name",
    Header: "Name",
  },
  startWall: {
    id: "start",
    accessor: "startWall",
    Header: "Start",
    sortType: (a, b) => (a.values.start.name > b.values.start.name ? -1 : 1),
    filter: (rows, id, filterValue) =>
      rows.filter((row) => row.values[id].name === filterValue),
  },
  endWall: {
    id: "end",
    accessor: "endWall",
    Header: "End",
    sortType: (a, b) => (a.values.end.name > b.values.end.name ? -1 : 1),
    filter: (rows, id, filterValue) =>
      rows.filter((row) => row.values[id].name === filterValue),
  },
  setters: {
    id: "setter",
    Header: "Setter",
    accessor: ({ setters }) =>
      setters.map((setter) => setter.username).join(", "),
    filter: (rows, id, filterValue) => {
      return rows.filter((row) => row.values[id].includes(filterValue));
    },
  },
  date: {
    id: "date",
    accessor: "createdAt",
    Header: "Date",
    sortType: (a, b) => (new Date(a) > new Date(b) ? -1 : 1),
    Cell: ({ value }) => parseDate(value)?.string,
  },
  ascent: {
    id: "ascent",
    accessor: "userAscent",
    Header: "Ascent",
    sortType: (a, b) => {
      return a.values.ascent?.type > b.values.ascent?.type ? -1 : 1;
    },
    filter: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id]?.type ? row.values[id].type : "todo";

        return rowValue === filterValue;
      });
    },
  },
  area: {
    hidden: true,
    id: "area",
    accessor: ({ areas }) => areas.map((areas) => areas.name).join(", "),
    Header: "Area",
    filter: (rows, id, filterValue) => {
      return rows.filter((row) => {
        return row.values[id].includes(filterValue);
      });
    },
  },
};

export const filters = {
  holdType: {
    label: "Hold type",
    renderOption: optionRenderers.holdType,
    getOptionLabel: (option) => option.name,
  },
  grade: {
    label: "Grade",
    renderOption: optionRenderers.grade,
    getOptionLabel: (option) => option.name,
  },
  setter: {
    label: "Setter",
    renderOption: (option) => option.username,
    getOptionLabel: (option) => option.username,
  },
  wall: {
    renderOption: (option) => option.name,
    getOptionLabel: (option) => option.name,
  },
  ascent: {
    label: "Ascent",
    options: ascentTypes,
    renderOption: optionRenderers.ascent,
    getOptionLabel: (option) => option.name,
  },
  area: {
    label: "Area",
    renderOption: (option) => option.name,
    getOptionLabel: (option) => option.name,
  },
};
