import {
  Area,
  AscentType,
  Boulder,
  Event,
  Grade,
  HoldType,
  InvalidAscentType,
  Location,
  Setter,
  User,
  ValidAscentType,
  Wall,
} from "../../lib/types";
import { uniqBy } from "../../lib/uniqueBy";
import { Label } from "../label/label";
import { Option, Select, SelectProps } from "../select/select";
import styles from "./boulderView.module.css";
import { HoldType as HoldTypeComponent } from "../holdType/holdType";
import { Grade as GradeComponent } from "../grade/grade";
import { Icon } from "../icon/icon";
import { Input } from "../input/input";
import { useMemo, useState } from "react";
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
import { Modal } from "../modal/modal";
import { EditBoulderForm } from "./editBoulderForm";
import { useSWRConfig } from "swr";
import { selectOptionLabels } from "../../lib/selectOptionLabels";
import { ascents } from "../../lib/globals";
import { IndeterminateCheckbox } from "../table/indeterminateCheckbox";
import { TableHeaderCell } from "../table/tableHeaderCell";
import Bar from "../bar/bar";
import { Button } from "../button/button";
import { Details } from "./details";
import { FilterTag } from "./filterTag";
import { IconButton } from "../iconButton/iconButton";
import { addAscent } from "../../lib/addAscent";
import { removeAscent } from "../../lib/removeAscent";
import { User as UserComponent } from "../user/user";
import { Pagination } from "../pagination/pagination";
import { parseDate } from "../../lib/parseDate";
import { useAppContext } from "../../pages/_app";
import { ascentColors } from "../ascent/ascent";

type BoulderViewProps = {
  data: Boulder[];
  forUser?: User;
  forEvent?: Event;
  initialFilters?: ColumnFiltersState;
};

type Filter<TOption extends Option> = {
  id: string;
  label: string;
} & SelectProps<TOption>;

function createFilter<TOption extends Option>(props: Filter<TOption>) {
  return props;
}

export function BoulderView({
  data,
  forUser,
  forEvent,
  initialFilters = [],
}: BoulderViewProps) {
  const { mutate } = useSWRConfig();
  const columnHelper = createColumnHelper<Boulder>();

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { currentLocation, hasRole } = useAppContext();

  const filters = useMemo<Filter<Option>[]>(
    () => [
      createFilter<Area>({
        id: "areas",
        label: "Area",
        options: uniqBy(
          data.flatMap((boulder) => boulder.areas),
          "id"
        ),
        getOptionLabel: (option) => option.name,
      }),
      createFilter<HoldType>({
        id: "holdType",
        label: "Hold type",
        options: uniqBy(
          data.flatMap((boulder) => boulder.holdType),
          "id"
        ),
        getOptionLabel: selectOptionLabels.holdType,
      }),
      createFilter<Grade>({
        id: "grade",
        label: "Grade",
        options: uniqBy(
          data.flatMap((boulder) => boulder.grade),
          "id"
        ),
        getOptionLabel: selectOptionLabels.grade,
      }),
      createFilter<Wall>({
        id: "startWall",
        label: "Start",
        options: uniqBy(
          data.flatMap((boulder) => boulder.startWall),
          "id"
        ),
        getOptionLabel: (option) => option.name,
      }),
      createFilter<Wall>({
        id: "endWall",
        label: "End",
        options: uniqBy(
          data.flatMap((boulder) => boulder.endWall),
          "id"
        ),
        getOptionLabel: (option) => option.name,
      }),
      createFilter<Setter>({
        id: "setters",
        label: "Setter",
        options: uniqBy(
          data.flatMap((boulder) => boulder.setters),
          "id"
        ),
        getOptionLabel: (option) => option.username,
      }),
      createFilter<AscentType>({
        id: "ascent",
        label: "Ascent",
        options: ascents,
        getOptionLabel: (option) => (
          <span>
            <Icon name={option.id as ValidAscentType | InvalidAscentType} />{" "}
            {option.name}
          </span>
        ),
      }),
    ],
    [data]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("areas", {
        id: "areas",
        header: () => null,
        cell: ({ row }) => null,
        filterFn: (row, columnId, filterValue: Area) => {
          if (!filterValue) {
            return true;
          }

          return row.original.areas.some((area) => area.id === filterValue.id);
        },
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
        filterFn: (row, columnId, filterValue: HoldType) => {
          if (!filterValue) {
            return true;
          }

          return row.original.holdType.id === filterValue.id;
        },
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
          if (!filterValue) {
            return true;
          }

          return row.original.grade.id === filterValue.id;
        },
      }),
      columnHelper.accessor("currentPoints", {
        header: () => "Points",
        cell: (props) => `${props.getValue()}`,
      }),
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (props) => (
          <>
            {hasRole("ROLE_ADMIN") || hasRole("ROLE_SETTER") ? (
              <Modal
                label="✏️"
                title={`Edit boulder ${props.row.original.name}`}
                className={styles.editButton}
              >
                <EditBoulderForm id={props.row.original.id} />
              </Modal>
            ) : null}

            <Modal
              label={
                <>
                  <span>{props.getValue()}</span> <Icon name="plus" />
                </>
              }
              title={`Details on ${props.row.original.name}`}
              className={cx(
                styles.name,
                typography.delta700,
                utilities.colors.lila
              )}
            >
              <Details id={props.row.original.id} />
            </Modal>
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
        filterFn: (row, columnId, filterValue: Wall) => {
          if (!filterValue) {
            return true;
          }

          return row.original.startWall.id === filterValue.id;
        },
      }),
      columnHelper.accessor("endWall", {
        header: () => "End",
        cell: ({ row }) => (
          <div className={utilities.typograpy.delta}>
            {row.original.endWall.name}
          </div>
        ),
        filterFn: (row, columnId, filterValue: Wall) => {
          if (!filterValue) {
            return true;
          }

          return row.original.endWall.id === filterValue.id;
        },
      }),
      columnHelper.accessor("setters", {
        header: () => "Setter",
        cell: (props) =>
          props
            .getValue()
            .map((setter) => setter.username)
            .join(",  "),
        filterFn: (row, columnId, filterValue: Setter) => {
          if (!filterValue) {
            return true;
          }

          return row.original.setters.some(
            (setter) => setter.id === filterValue.id
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: () => "Date",
        cell: (props) => parseDate(props.getValue()),
      }),
      columnHelper.accessor("userAscent", {
        id: "ascent",
        header: () => "Flash | Top | Hide",
        cell: ({ getValue, row }) => {
          const ascent = getValue();

          return (
            <Ascents
              userAscent={ascent}
              onCheck={async (type) => {
                const mutations = await addAscent({
                  type,
                  boulderId: row.original.id,
                  location: currentLocation as Location,
                  forUser,
                  forEvent,
                });

                for (const key of mutations) {
                  await mutate(key);
                }
              }}
              onUncheck={async () => {
                if (!ascent) {
                  return;
                }

                const mutations = await removeAscent({
                  ascentId: ascent.id,
                  boulderId: row.original.id,
                  location: currentLocation as Location,
                  forUser,
                  forEvent,
                });

                for (const key of mutations) {
                  await mutate(key);
                }
              }}
            />
          );
        },
        filterFn: (row, columnId, filterValue: AscentType) => {
          if (!filterValue) {
            return true;
          }

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
          const ascent = row.original.userAscent;

          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
              className={styles.expanderButton}
            >
              {row.getIsExpanded() ? (
                <Icon name="close" />
              ) : (
                <>
                  {ascent ? (
                    <span
                      className={cx(typography.delta700, utilities.colors.lila)}
                    >
                      <Icon
                        name={ascent.type}
                        style={{
                          color: ascentColors[ascent.type],
                        }}
                      />
                      Edit
                    </span>
                  ) : (
                    <span
                      className={cx(typography.delta700, utilities.colors.lila)}
                    >
                      Add
                    </span>
                  )}
                </>
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
        select: hasRole("ROLE_ADMIN") || hasRole("ROLE_SETTER"),
      },
    },

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,
    autoResetAll: false,

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
          {filters.map((filter) => {
            const header = table
              .getFlatHeaders()
              .find((column) => column.id === filter.id);

            const appliedFilter = columnFilters.find(
              (columnFilter) => columnFilter.id === filter.id
            );

            type Option = (typeof filter.options)[number];

            return (
              <div className={styles.filter} key={filter.id}>
                <Label htmlFor={filter.id}>{filter.label}</Label>

                <Select
                  {...filter}
                  emptyOptionLabel="All"
                  value={appliedFilter ? (appliedFilter.value as Option) : null}
                  className={styles.select}
                  onChange={(value) => {
                    header?.column?.setFilterValue(() => value);
                    table.resetPageIndex();
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.search}>
          <div className={styles.searchTags}>
            {columnFilters.map((columnFilter) => {
              const filter = filters.find(
                (filter) => filter.id === columnFilter.id
              );

              if (!filter || !columnFilter.value) {
                return null;
              }

              return (
                <FilterTag key={columnFilter.id}>
                  <span className={utilities.typograpy.delta700}>
                    {filter.getOptionLabel(columnFilter.value as Option)}
                  </span>

                  <IconButton
                    outline={false}
                    icon="close"
                    onClick={() =>
                      setColumnFilters([
                        ...columnFilters.filter(
                          (appliedColumnFilter) =>
                            appliedColumnFilter.id !== columnFilter.id
                        ),
                      ])
                    }
                  />
                </FilterTag>
              );
            })}
          </div>

          <Input
            className={styles.searchInput}
            value={globalFilter ?? ""}
            onChange={(value) => {
              if (value) {
                setGlobalFilter(value.toString());
              }
            }}
            name={"search"}
            placeholder={"Search"}
          />
        </div>
      </div>

      <div className={styles.table}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className={cx(
              styles.header,
              hasRole("ROLE_ADMIN") || hasRole("ROLE_SETTER")
                ? styles.isAdmin
                : null
            )}
          >
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
              <RowComponent
                collapsed={collapsed}
                admin={hasRole("ROLE_ADMIN") || hasRole("ROLE_SETTER")}
                {...row}
              />

              {row.getIsExpanded() ? (
                <SubRow
                  {...row}
                  onClose={() => row.toggleExpanded()}
                  forEvent={forEvent}
                />
              ) : null}
            </>
          );
        })}
      </div>

      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={10}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={() => table.previousPage()}
        nextPage={() => table.nextPage()}
      />

      <Bar variant={"danger"} visible={Object.keys(rowSelection).length > 0}>
        <span
          className={cx(utilities.typograpy.gamma, utilities.typograpy.nowrap)}
        >
          Selected ({Object.keys(rowSelection).length})
        </span>

        <Button variant={"danger"} display={"inline"}>
          Deactivate
        </Button>
      </Bar>

      <Bar variant={"danger"} visible={forUser !== undefined}>
        {forUser ? (
          <span
            className={cx(
              utilities.typograpy.gamma,
              utilities.typograpy.nowrap
            )}
          >
            Checking boulders for user:{" "}
            <UserComponent username={forUser.username} image={forUser.image} />
          </span>
        ) : null}
      </Bar>
    </>
  );
}
