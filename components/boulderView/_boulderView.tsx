import {
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
  flexRender,
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
import { IndeterminateCheckbox } from "./indeterminateCheckbox";
import { capitalize } from "../../lib/capitalize";
import { parseDate } from "../../utilties/parseDate";
import { Modal } from "../modal/modal";
import { EditBoulderForm } from "./editBoulderForm";

type Filter = {
  id: string;
  value: string;
};

type BoulderViewProps = {
  data: Boulder[];
  initialFilters: Filter[];
};

export const ascentTypes: AscentType[] = [
  {
    id: "todo",
    name: "Todo",
    color: "#f2f2f2",
  },
  {
    id: "flash",
    name: "Flash",
    color: "#1687ff",
  },
  {
    id: "top",
    name: "Top",
    color: "#02deaf",
  },
  {
    id: "resignation",
    name: "Resignation",
    color: "#ff5d5f",
  },
];

export function BoulderView({ data, initialFilters }: BoulderViewProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const filters = useMemo(
    () => [
      {
        id: "area",
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
        getOptionLabel: (option: HoldType) => (
          <span className={styles.holdTypeOption}>
            <HoldTypeComponent image={option.image} />
            {option.name}
          </span>
        ),
      },
      {
        id: "grade",
        label: "Grade",
        options: uniqBy(
          data.flatMap((boulder) => boulder.grade),
          "id"
        ),
        getOptionLabel: (option: Grade) => (
          <span style={{ color: option.color }}>Grade {option.name}</span>
        ),
      },
      {
        id: "start",
        label: "Start",
        options: uniqBy(
          data.flatMap((boulder) => boulder.startWall),
          "id"
        ),
        getOptionLabel: (option: Wall) => option.name,
      },
      {
        id: "end",
        label: "End",
        options: uniqBy(
          data.flatMap((boulder) => boulder.endWall),
          "id"
        ),
        getOptionLabel: (option: Wall) => option.name,
      },
      {
        id: "setter",
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
        options: ascentTypes,
        getOptionLabel: (option: AscentType) => (
          <span>
            <Icon name={option.id} /> {option.name}
          </span>
        ),
      },
    ],
    [data]
  );

  const columnHelper = createColumnHelper<Boulder>();

  const columns = [
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
      cell: (props) => {
        const { image } = props.getValue();

        return <HoldTypeComponent image={image} size="small" />;
      },
    }),
    columnHelper.accessor("grade", {
      header: () => "Grade",
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
    columnHelper.accessor("startWall.name", {
      id: "startWall",
      header: () => "Start",
      cell: (props) => (
        <div className={utilities.typograpy.delta}>{props.renderValue()}</div>
      ),
    }),
    columnHelper.accessor("endWall.name", {
      id: "endWall",
      header: () => "End",
      cell: (props) => (
        <div className={utilities.typograpy.delta}>{props.renderValue()}</div>
      ),
    }),
    columnHelper.accessor("setters", {
      header: () => "Setter",
      cell: (props) =>
        props
          .getValue()
          .map((setter) => setter.username)
          .join(",  "),
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Date",
      cell: (props) => parseDate(props.getValue()).string,
    }),
    columnHelper.accessor("userAscent", {
      id: "ascent",
      header: () => "",
      cell: (props) => <Ascents userAscent={props.getValue()} />,
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
              <span className={cx(typography.delta700, utilities.colors.lila)}>
                Add
              </span>
            )}
          </button>
        ) : null;
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row: Row<Boulder>) => true,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
      sorting,
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
                options={filter.options}
                getOptionLabel={filter.getOptionLabel}
                name={filter.id}
                id={filter.id}
                className={styles.select}
                onChange={(value) =>
                  setColumnFilters([
                    ...columnFilters,
                    {
                      id: filter.id,
                      value,
                    },
                  ])
                }
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
        <div>
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className={styles.header}>
              {headerGroup.headers.map((header) => {
                return (
                  <div
                    key={header.id}
                    className={cx(
                      styles.headerCell,
                      styles[`is${capitalize(header.column.id)}HeaderCell`]
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <button
                          {...{
                            className: cx(utilities.typograpy.delta700),
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: <Icon name="chevronUp" />,
                            desc: <Icon name="chevronDown" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          {table.getRowModel().rows.map((row) => {
            return (
              <>
                <RowComponent collapsed={collapsed} {...row} />
                {row.getIsExpanded() ? <SubRow {...row} /> : null}
              </>
            );
          })}
        </div>
      </div>

      <Pagination
        pageIndex={table.getState().pagination.pageIndex + 1}
        pageSize={10}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={() => table.previousPage()}
        nextPage={() => table.nextPage()}
      />
    </>
  );
}
