import { useHttp } from "../../hooks/useHttp";
import useDrawer from "../../hooks/useDrawer";
import { useSWRConfig } from "swr";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../pages/_app";
import useBoulderFilters from "../../hooks/useBoulderFilters";
import filterPresentOptions from "../../utilties/filterPresentOptions";
import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import BoulderTable, {
  ascentTypes,
  columns,
  filters as boulderFilters,
  resolveFilterValue,
} from "../boulderTable/boulderTable";
import HoldType from "../holdType/holdType";
import Grade from "../grade/grade";
import styles from "./boulderView.module.css";
import DetailButton from "../boulderTable/detailButton";
import Ascents from "../boulderTable/ascents";
import IndeterminateCheckbox from "../table/IndeterminateCheckbox";
import Link from "next/link";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import toast from "../../utilties/toast";
import Select from "../select/select";
import GlobalFilter from "../boulderTable/globalFilter";
import CollapsedRow from "../boulderTable/collapsedRow";
import Drawer from "../drawer/drawer";
import BoulderDetail from "../boulderDetail/boulderDetail";
import Bar from "../bar/bar";
import Button from "../button/button";
import Tooltip from "../tooltip/tooltip";
import WallDetail from "../wallDetail/wallDetail";
import useAddAscent from "../../hooks/useAddAscent";
import useRemoveAscent from "../../hooks/useRemoveAscent";
import usePersistentState from "../../hooks/usePersistentState";

export function useBoulderView({ event, forUser }) {
  const { setOpen } = useDrawer();
  const { roles } = useContext(AppContext);
  const isAdmin = roles?.includes("admin");

  const [detailWall, setDetailWall] = useState(null);
  const [detailBoulder, setDetailBoulder] = useState(null);

  useEffect(() => {
    setOpen(!!detailWall);
  }, [detailWall]);

  useEffect(() => {
    setOpen(!!detailBoulder);
  }, [detailBoulder]);

  return useMemo(() => {
    return {
      defaultColumns: [
        {
          ...columns.holdType,
          Cell: ({ value, row }) => (
            <Tooltip title={row.original.holdType.name}>
              <HoldType image={value.image} />
            </Tooltip>
          ),
        },
        {
          ...columns.grade,
          Cell: ({ value }) => {
            if (isAdmin && value.internal) {
              return (
                <Grade
                  name={value.name}
                  color={value.color}
                  internalName={value.internal.name}
                  internalColor={value.internal.color}
                />
              );
            }

            return <Grade name={value.name} color={value.color} />;
          },
        },
        {
          ...columns.points,
          className: styles.pointsCell,
          Cell: ({ value }) => `${value} pts`,
        },
        {
          ...columns.name,
          Cell: ({ value, row }) => {
            const boulderId = row.original.id;

            return (
              <DetailButton
                active={detailBoulder === boulderId}
                onClick={() => {
                  setDetailBoulder(boulderId);
                }}
              >
                {value}
              </DetailButton>
            );
          },
        },
        {
          ...columns.startWall,
          className: styles.startWallCell,
          Cell: ({ value, row }) => (
            <span
              onClick={() => {
                setDetailWall(row.original.startWall.id);
              }}
            >
              {value.name}
            </span>
          ),
        },
        {
          ...columns.endWall,
          className: styles.endWallCell,
          Cell: ({ value, row }) => (
            <span
              onClick={() => {
                setDetailWall(row.original.endWall?.id);
              }}
            >
              {value.name}
            </span>
          ),
        },
        {
          ...columns.setters,
          className: styles.setterCell,
          Cell: ({ value }) => <span>{value}</span>,
        },
        {
          ...columns.date,
        },
        {
          ...columns.ascent,
          Cell: ({ row }) => (
            <Ascents
              onAdd={useAddAscent(event, forUser)}
              onRemove={useRemoveAscent(event, forUser)}
              boulder={row.original}
            />
          ),
        },
        {
          ...columns.area,
          Cell: ({}) => null,
        },
      ],
      detailWall,
      setDetailWall,
      detailBoulder,
      setDetailBoulder,
    };
  }, [event, forUser, detailBoulder, detailWall]);
}

export function useBoulderViewFilterOptions(boulders) {
  return useMemo(() => {
    return {
      grades: filterPresentOptions(boulders, "grade", "id").sort((a, b) =>
        a.name > b.name ? 1 : -1
      ),
      holdTypes: sortItemsAlphabetically(
        filterPresentOptions(boulders, "holdType"),
        "name"
      ),
      walls: sortItemsAlphabetically(
        filterPresentOptions(boulders, "startWall"),
        "name"
      ),
      setters: sortItemsAlphabetically(
        filterPresentOptions(boulders, "setters"),
        "username"
      ),
      areas: sortItemsAlphabetically(
        filterPresentOptions(boulders, "areas"),
        "name"
      ),
    };
  }, [boulders]);
}

export default function BoulderView({
  boulders,
  event,
  initialFilters = [],
  forUser = null,
}) {
  const http = useHttp();
  const { mutate } = useSWRConfig();

  const { currentLocation, dispatchMessage, roles } = useContext(AppContext);
  const isAdmin = roles?.includes("admin");

  const [selected, setSelected] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [matches, setMatches] = useState(0);
  const [fixedView, setFixedView] = usePersistentState(
    "fixedViewBoulderIndex",
    false
  );

  const { filters, setFilters, applyFilter } =
    useBoulderFilters(initialFilters);

  const { grades, holdTypes, walls, setters, areas } =
    useBoulderViewFilterOptions(boulders);

  const {
    defaultColumns,
    detailWall,
    setDetailWall,
    detailBoulder,
    setDetailBoulder,
  } = useBoulderView({
    event,
    forUser,
  });

  const tableColumns = useMemo(() => {
    if (isAdmin) {
      defaultColumns.unshift({
        ...columns.selection,
        Cell: ({ row }) => (
          <div className={styles.editCell}>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />

            <Link
              href={`/${currentLocation?.url}/admin/boulders/${row.original.id}`}
              className={cn(typography.eta, styles.editLink)}
            >
              ✏️
            </Link>
          </div>
        ),
      });
    }

    return defaultColumns;
  }, [isAdmin, defaultColumns]);

  return (
    <>
      <div className={cn(typography.alpha700)}>Boulder ({matches})</div>

      <div className={styles.filters}>
        <Select
          {...boulderFilters.area}
          value={resolveFilterValue(filters, "area", areas)}
          options={areas}
          onChange={(event, newValue) => {
            applyFilter("area", newValue ? newValue.name : null);
          }}
          items={areas}
        />

        <Select
          {...boulderFilters.holdType}
          value={resolveFilterValue(filters, "holdType", holdTypes)}
          options={holdTypes}
          onChange={(event, newValue) =>
            applyFilter("holdType", newValue ? newValue.name : null)
          }
          items={holdTypes}
        />

        <Select
          {...boulderFilters.grade}
          value={resolveFilterValue(filters, "grade", grades)}
          options={grades}
          onChange={(event, newValue) =>
            applyFilter("grade", newValue ? newValue.name : null)
          }
          items={grades}
        />

        <Select
          {...boulderFilters.wall}
          value={resolveFilterValue(filters, "start", walls)}
          options={walls}
          label={"Start"}
          onChange={(event, newValue) =>
            applyFilter("start", newValue ? newValue.name : null)
          }
          items={walls}
        />

        <Select
          {...boulderFilters.wall}
          label={"End"}
          value={resolveFilterValue(filters, "end", walls)}
          options={walls}
          onChange={(event, newValue) =>
            applyFilter("end", newValue ? newValue.name : null)
          }
          items={walls}
        />

        <Select
          {...boulderFilters.setter}
          value={resolveFilterValue(filters, "setter", setters, "username")}
          options={setters}
          onChange={(event, newValue) => {
            applyFilter("setter", newValue ? newValue.username : null);
          }}
        />

        <Select
          {...boulderFilters.ascent}
          value={resolveFilterValue(filters, "ascent", ascentTypes, "id")}
          onChange={(event, newValue) => {
            applyFilter("ascent", newValue ? newValue.id : null);
          }}
        />
      </div>

      <div className={styles.checkbox}>
        <label htmlFor="fixedView" className={typography.epsilon}>
          Show all columns
        </label>

        <input
          type="checkbox"
          id={"fixedView"}
          checked={fixedView}
          onChange={(event) => setFixedView(event.target.checked)}
        />
      </div>

      <GlobalFilter
        filters={filters}
        setFilters={setFilters}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />

      <BoulderTable
        onFilter={(rows) => {
          setMatches(rows.length);
        }}
        fixedColumns={fixedView}
        columns={tableColumns}
        data={boulders}
        filters={filters}
        globalFilter={globalFilter}
        onSelectRows={(ids) => setSelected(ids)}
        isAdmin={isAdmin}
        headerClassName={cn(
          isAdmin ? styles.isAdminTableHeader : styles.tableHeader,
          fixedView ? styles.isFixedTableHeader : styles.isFluidTableHeader
        )}
        rowClassName={cn(
          isAdmin ? styles.isAdminTableRow : styles.tableRow,
          fixedView ? styles.isFixedTableRow : styles.isFluidTableRow
        )}
        collapsedRowRenderer={(cells) => <CollapsedRow cells={cells} />}
      />

      <Drawer
        onClose={() => {
          setDetailBoulder(null);
          setDetailWall(null);
        }}
      >
        {detailBoulder && <BoulderDetail id={detailBoulder} event={event} />}
        {detailWall && <WallDetail id={detailWall} />}
      </Drawer>

      <Bar visible={selected.length > 0}>
        <span className={typography.gamma}>Selected ({selected.length})</span>
        <span className={styles.barButtons}>
          <Button
            variant={"danger"}
            onClick={async () => {
              try {
                await http.put(`/${currentLocation?.url}/boulders/mass`, {
                  items: selected,
                  operation: "deactivate",
                });

                mutate(`/${currentLocation?.url}/boulders`);
              } catch (error) {
                dispatchMessage(toast(error));
              }
            }}
          >
            Deactivate
          </Button>
        </span>
      </Bar>

      <Bar visible={!!forUser} variant={"danger"}>
        <div>
          ⚠️ You are currently checking boulders for user&nbsp;
          <strong>{forUser?.username}</strong>
        </div>
      </Bar>
    </>
  );
}
