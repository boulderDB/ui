import styles from "./rankingView.module.css";
import { Progress } from "../progress/progress";
import calculatePercentage from "../../utilties/calculatePercentage";
import { parseDate } from "../../utilties/parseDate";
import { Rank } from "../../lib/types";
import {
  Row,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import utilities from "../../styles/utilities/utilities";
import { Icon } from "../icon/_icon";
import { useMemo, useState } from "react";
import { Input } from "../input/input";
import { UserRank } from "./userRank";
import { TableHeaderCell } from "../table/tableHeaderCell";
import { capitalize } from "../../lib/capitalize";
import cx from "classix";
import { Row as RowComponent } from "./row";
import { SubRow } from "./subRow";

type RankingViewProps = {
  data: Rank[];
  boulderCount: number;
};

export default function RankingView({ data, boulderCount }: RankingViewProps) {
  const columnHelper = createColumnHelper<Rank>();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "rank",
        header: () => "Rank",
        cell: (props) => (
          <span className={utilities.typograpy.delta700}>
            {props.row.index + 1}
          </span>
        ),
      }),
      columnHelper.accessor("user.username", {
        header: () => "Username",
        cell: ({row}) => {
          return (
            <UserRank
              username={row.original.user.username}
              image={row.original.user.image}
              sentAllBoulders={row.original.total.count === boulderCount}
            />
          );
        }
      }),
      columnHelper.accessor("user.gender", {
        id: "gender",
        header: () => "Gender",
        cell: (props) => <Icon name={props.getValue()} />,
      }),
      columnHelper.accessor("points", {
        id: "points",
        header: () => "Points",
        cell: (props) => <span>{props.getValue()}</span>,
      }),
      columnHelper.accessor("total.count", {
        id: "total",
        header: () => "Boulders",
        cell: (props) => (
          <Progress percentage={(props.getValue() / boulderCount) * 100} />
        ),
      }),
      columnHelper.accessor("flash.count", {
        id: "flashed",
        header: () => "Flashed",
        cell: (props) => (
          <span>{calculatePercentage(props.getValue(), boulderCount)}</span>
        ),
      }),
      columnHelper.accessor("top.count", {
        id: "topped",
        header: () => "Topped",
        cell: (props) => (
          <span>{calculatePercentage(props.getValue(), boulderCount)}</span>
        ),
      }),
      columnHelper.accessor("user.lastActivity", {
        id: "lastActivity",
        header: () => "Last activity",
        cell: (props) => <span>{parseDate(props.getValue()).string}</span>,
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
                <Icon name="plus" />
              )}
            </button>
          ) : null;
        },
      }),
    ],
    [boulderCount]
  );

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row: Row<Rank>) => true,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Input
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(value)}
        name={"search"}
        placeholder={"Search"}
        className={styles.search}
      />

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
              <RowComponent {...row} />

              {row.getIsExpanded() ? (
                <SubRow {...row} onClose={() => row.toggleExpanded()} />
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
}
