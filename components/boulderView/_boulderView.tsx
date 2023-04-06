import {
  Area,
  AscentType,
  Boulder,
  Grade,
  HoldType,
  Setter,
  Wall,
} from "../../lib/types";
import { uniqBy } from "../../lib/uniqueBy";
import { Label } from "../label/_label";
import { Select } from "../select/_select";
import styles from "./boulderView.module.css";
import { HoldType as HoldTypeComponent } from "../holdType/holdType";
import { Grade as GradeComponent } from "../grade/grade";
import { Icon } from "../icon/_icon";
import { Input } from "../input/input";
import { useMemo, useState } from "react";
import Pagination from "../../components/pagination/pagination";
import {
  ColumnFiltersState,
  Row,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import { useMediaQuery } from "@mui/material";
import { customMedia } from "../../styles/cssExports";
import { Row as RowComponent } from "./row";
import { SubRow } from "./subRow";
import { Ascents } from "./ascents";
import { typography } from "../../styles/utilities";
import { capitalize } from "../../lib/capitalize";
import { parseDate } from "../../utilties/parseDate";
import { Modal } from "../modal/modal";
import { EditBoulderForm } from "./editBoulderForm";
import axios from "axios";
import { useAppContext } from "../../pages/_app";
import { useSWRConfig } from "swr";
import { selectOptionLabels } from "../../lib/selectOptionLabels";
import { ascents } from "../../lib/globals";
import { IndeterminateCheckbox } from "../table/indeterminateCheckbox";
import { TableHeaderCell } from "../table/tableHeaderCell";

type BoulderViewProps = {
  data: Boulder[];
  initialFilters?: ColumnFiltersState;
};

export function BoulderView({ data, initialFilters = [] }: BoulderViewProps) {
  const { mutate } = useSWRConfig();
  const columnHelper = createColumnHelper<Boulder>();

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { currentLocation, hasRole } = useAppContext();

  const filters = useMemo(
    () => [
      {
        id: "areas",
        label: "Area",
        options: uniqBy(
          data.flatMap((boulder) => boulder.areas),
          "id"
        ),
        getOptionLabel: (option: Grade) => option.name,
      },
      {
        id: "holdType",
        label: "Hold type",
        options: uniqBy(
          data.flatMap((boulder) => boulder.holdType),
          "id"
        ),
        getOptionLabel: selectOptionLabels.holdType,
        getValue: (option: HoldType) => option.name,
      },
      {
        id: "grade",
        label: "Grade",
        options: uniqBy(
          data.flatMap((boulder) => boulder.grade),
          "id"
        ),
        getOptionLabel: selectOptionLabels.grade,
      },
      {
        id: "startWall",
        label: "Start",
        options: uniqBy(
          data.flatMap((boulder) => boulder.startWall),
          "id"
        ),
        getOptionLabel: (option: Wall) => option.name,
      },
      {
        id: "endWall",
        label: "End",
        options: uniqBy(
          data.flatMap((boulder) => boulder.endWall),
          "id"
        ),
        getOptionLabel: (option: Wall) => option.name,
      },
      {
        id: "setters",
        label: "Setter",
        options: uniqBy(
          data.flatMap((boulder) => boulder.setters),
          "id"
        ),
        getOptionLabel: (option: Setter) => option.username,
      },
      {
        id: "ascent",
        label: "Ascent",
        options: ascents,
        getOptionLabel: (option: AscentType) => (
          <span>
            <Icon name={option.id} /> {option.name}
          </span>
        ),
      },
    ],
    [data]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("areas", {
        header: () => null,
        cell: ({ row }) => null,
        filterFn: (row, columnId, filterValue: Area) =>
          row.original.areas.some((area) => area.id === filterValue.id),
      }),
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      }),
      columnHelper.accessor("holdType", {
        header: () => "Hold",
        cell: ({ row }) => {
          const { image } = row.original.holdType;

          return <HoldTypeComponent image={image} size="small" />;
        },
        filterFn: (row, columnId, filterValue: HoldType) =>
          row.original.holdType.id === filterValue.id,
      }),
      columnHelper.accessor("grade", {
        header: () => "Grade",
        enableColumnFilter: true,
        cell: (props) => {
          const { color, name } = props.getValue();

          return (
            <GradeComponent
              color={color}
              name={name}
              className={utilities.typograpy.delta}
            />
          );
        },
        filterFn: (row, columnId, filterValue: Grade) => {
          return row.original.grade.id === filterValue.id;
        },
      }),
      columnHelper.accessor("points", {
        header: () => "Points",
        cell: (props) => `${props.getValue()}`,
      }),
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (props) => (
          <>
            <Modal
              label="✏️"
              title={`Edit boulder ${props.row.original.name}`}
              className={styles.editButton}
            >
              <EditBoulderForm id={props.row.original.id} />
            </Modal>

            <button
              onClick={() => alert("b21b1")}
              className={cx(
                styles.name,
                typography.delta700,
                utilities.colors.lila
              )}
            >
              <span>{props.getValue()}</span>
              <Icon name="plus" />
            </button>
          </>
        ),
      }),
      columnHelper.accessor("startWall", {
        header: () => "Start",
        cell: ({ row }) => (
          <div className={utilities.typograpy.delta}>
            {row.original.startWall.name}
          </div>
        ),
        filterFn: (row, columnId, filterValue: Wall) =>
          row.original.startWall.id === filterValue.id,
      }),
      columnHelper.accessor("endWall", {
        header: () => "End",
        cell: ({ row }) => (
          <div className={utilities.typograpy.delta}>
            {row.original.endWall.name}
          </div>
        ),
        filterFn: (row, columnId, filterValue: Wall) =>
          row.original.endWall.id === filterValue.id,
      }),
      columnHelper.accessor("setters", {
        header: () => "Setter",
        cell: (props) =>
          props
            .getValue()
            .map((setter) => setter.username)
            .join(",  "),
        filterFn: (row, columnId, filterValue: Setter) =>
          row.original.setters.some((setter) => setter.id === filterValue.id),
      }),
      columnHelper.accessor("createdAt", {
        header: () => "Date",
        cell: (props) => parseDate(props.getValue()).string,
      }),
      columnHelper.accessor("userAscent", {
        id: "ascent",
        header: () => "",
        cell: ({ getValue, row }) => {
          const ascent = getValue();

          return (
            <Ascents
              userAscent={ascent}
              onCheck={async (type) => {
                await axios.post(`/api/${currentLocation?.url}/ascents`, {
                  boulder: row.original.id,
                  type,
                });

                await mutate(`/api/${currentLocation?.url}/boulders`);
              }}
              onUncheck={async (type) => {
                await axios.delete(
                  `/api/${currentLocation?.url}/ascents/${ascent?.id}`
                );

                await mutate(`/api/${currentLocation?.url}/boulders`);
              }}
            />
          );
        },
        filterFn: (row, columnId, filterValue: AscentType) => {
          if (filterValue.id === "todo") {
            return row.original.userAscent === null;
          }

          return row.original.userAscent?.type === filterValue.id;
        },
      }),
      columnHelper.display({
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? (
                <Icon name="close" />
              ) : (
                <span
                  className={cx(typography.delta700, utilities.colors.lila)}
                >
                  Add
                </span>
              )}
            </button>
          ) : null;
        },
      }),
    ],
    [currentLocation]
  );

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row: Row<Boulder>) => true,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
      sorting,
      columnVisibility: {
        areas: false,
        select: hasRole("ROLE_ADMIN") || hasRole("ROLE_SETTER"),
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const collapsed = useMediaQuery(customMedia?.[`--m-to-s`], {
    noSsr: true,
  });

  return (
    <>
      <div className={styles.refine}>
        <div className={styles.filters}>
          {filters.map((filter) => (
            <div className={styles.filter} key={filter.id}>
              <Label htmlFor={filter.id}>{filter.label}</Label>

              <Select
                value={columnFilters.find(
                  (columnFilter) => columnFilter.id === filter.id
                )}
                options={filter.options}
                getOptionLabel={filter.getOptionLabel}
                name={filter.id}
                id={filter.id}
                className={styles.select}
                onChange={(value) => {
                  setColumnFilters([
                    ...columnFilters,
                    {
                      id: filter.id,
                      value,
                    },
                  ]);
                }}
              />
            </div>
          ))}
        </div>

        <Input
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(value)}
          name={"search"}
          placeholder={"Search"}
          className={styles.search}
        />
      </div>

      <div className={styles.table}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className={styles.header}>
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={cx(
                  styles.headerCell,
                  styles[`is${capitalize(header.column.id)}HeaderCell`]
                )}
              >
                <TableHeaderCell header={header} />
              </div>
            ))}
          </div>
        ))}

        {table.getRowModel().rows.map((row) => {
          return (
            <>
              <RowComponent collapsed={collapsed} {...row} />

              {row.getIsExpanded() ? (
                <SubRow {...row} onClose={() => row.toggleExpanded()} />
              ) : null}
            </>
          );
        })}
      </div>

      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={20}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={() => table.previousPage()}
        nextPage={() => table.nextPage()}
      />
    </>
  );
}
