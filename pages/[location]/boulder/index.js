import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import sortItemsAlphabetically from "../../../utilties/sortItemsAlphabetically";
import filterPresentOptions from "../../../utilties/filterPresentOptions";
import { useCallback, useContext, useMemo, useState } from "react";
import Grade from "../../../components/grade/grade";
import HoldType from "../../../components/holdType/holdType";
import { useCachedHttp, useHttp } from "../../../hooks/useHttp";
import { AppContext } from "../../_app";
import Drawer from "../../../components/drawer/drawer";
import BoulderTable, {
  filters as boulderFilters,
} from "../../../components/boulderTable/boulderTable";
import styles from "./index.module.css";
import Select from "../../../components/select/select";
import toast from "../../../utilties/toast";
import AscentIcon from "../../../components/ascentIcon/ascentIcon";
import GlobalFilter from "../../../components/boulderTable/globalFilter";
import Ascents from "../../../components/boulderTable/ascents";
import { mutate } from "swr";
import extractErrorMessage from "../../../utilties/extractErrorMessage";
import CollapsedRow from "../../../components/boulderTable/collapsedRow";
import contextualizedApiPath from "../../../utilties/contextualizedApiPath";
import DetailButton from "../../../components/boulderTable/detailButton";
import useDrawer from "../../../hooks/useDrawer";
import RateButton from "../../../components/boulderTable/rateButton";
import Button from "../../../components/button/button";
import Bar from "../../../components/bar/bar";
import useBoulderFilters from "../../../hooks/useBoulderFilters";
import BoulderDetail from "../../../components/boulderDetail/boulderDetail";
import { columns } from "../../../components/boulderTable/boulderTable";
import Loader from "../../../components/loader/loader";
import IndeterminateCheckbox from "../../../components/table/IndeterminateCheckbox";
import Link from "next/link";

export default function Index() {
  const http = useHttp();
  const { toggle } = useDrawer();

  const { currentLocation, dispatchMessage, roles } = useContext(AppContext);
  const isAdmin = roles?.includes("admin");

  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);
  const areas = useCachedHttp(`/${currentLocation?.url}/areas`);

  const [detailBoulder, setDetailBoulder] = useState(null);
  const [selected, setSelected] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { filters, setFilters, applyFilter } = useBoulderFilters();

  const grades = useMemo(
    () =>
      filterPresentOptions(boulders, "grade", "id").sort((a, b) =>
        a.name > b.name ? 1 : -1
      ),
    [boulders]
  );

  const holdTypes = useMemo(
    () =>
      sortItemsAlphabetically(
        filterPresentOptions(boulders, "holdType"),
        "name"
      ),
    [boulders]
  );

  const walls = useMemo(
    () =>
      sortItemsAlphabetically(
        filterPresentOptions(boulders, "startWall"),
        "name"
      ),
    [boulders]
  );

  const setters = useMemo(
    () =>
      sortItemsAlphabetically(
        filterPresentOptions(boulders, "setters"),
        "username"
      ),
    [boulders]
  );

  const tableColumns = useMemo(() => {
    const defaultColumns = [
      {
        ...columns.holdType,
        Cell: ({ value }) => <HoldType image={value.image} />,
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
              boulderId={boulderId}
              onClick={(id) => {
                setDetailBoulder(id);
                toggle(true);
              }}
            >
              {value}
            </DetailButton>
          );
        },
      },
      {
        ...columns.startWall,
        Cell: ({ value }) => <span>{value.name}</span>,
      },
      {
        ...columns.endWall,
        className: styles.endWallCell,
        Cell: ({ value }) => <span>{value.name}</span>,
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
        Cell: ({ value, row }) => (
          <Ascents
            onAdd={addHandler}
            onRemove={removeHandler}
            boulderId={row.original.id}
            userAscent={value}
          />
        ),
      },
    ];

    if (isAdmin) {
      defaultColumns.unshift({
        ...columns.selection,
        Cell: ({ row }) => (
          <div>
            <Link
              href={`/${currentLocation?.url}/admin/boulder/${row.original.id}`}
            >
              ✏️
            </Link>

            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      });
    }

    return defaultColumns;
  }, [isAdmin, detailBoulder]);

  const addHandler = useCallback(async (boulder, type) => {
    try {
      await http.post(`/${currentLocation?.url}/ascents`, {
        boulder,
        type,
      });
      console.log(contextualizedApiPath(currentLocation, "/boulders"));
      mutate(contextualizedApiPath(currentLocation, "/boulders"));

      dispatchMessage(
        toast(
          "Ascent added",
          <>
            <span>
              <AscentIcon type={type} fill={true} />+{"points"}
            </span>

            <div className={styles.rating}>
              <span>Leave a rating:</span>

              <RateButton direction={"up"} boulderId={boulder} />

              <span>/</span>

              <RateButton direction={"down"} boulderId={boulder} />
            </div>
          </>,
          "info",
          4000
        )
      );
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  }, []);

  const removeHandler = useCallback(async (id) => {
    try {
      await http.delete(`/${currentLocation?.url}/ascents`);
      await mutate(contextualizedApiPath(currentLocation, "/ascents"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  }, []);

  if (!boulders) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"boulder"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Boulder
          {isAdmin && (
            <Button
              size={"small"}
              href={`/${currentLocation?.url}/admin/boulders/create`}
            >
              Add
            </Button>
          )}
        </h1>

        <div className={layoutStyles.sideContent}>
          <div className={styles.filters}>
            <Select
              {...boulderFilters.area}
              options={areas}
              onChange={(event, newValue) =>
                applyFilter("area", newValue ? newValue.name : null)
              }
              items={areas}
            />

            <Select
              {...boulderFilters.holdType}
              options={holdTypes}
              onChange={(event, newValue) =>
                applyFilter("holdType", newValue ? newValue.name : null)
              }
              items={holdTypes}
            />

            <Select
              {...boulderFilters.grade}
              options={grades}
              onChange={(event, newValue) =>
                applyFilter("grade", newValue ? newValue.name : null)
              }
              items={grades}
            />

            <Select
              {...boulderFilters.wall}
              label={"Start"}
              options={walls}
              onChange={(event, newValue) =>
                applyFilter("start", newValue ? newValue.name : null)
              }
              items={walls}
            />

            <Select
              {...boulderFilters.wall}
              label={"End"}
              options={walls}
              onChange={(event, newValue) =>
                applyFilter("end", newValue ? newValue.name : null)
              }
              items={walls}
            />

            <Select
              {...boulderFilters.setter}
              options={setters}
              value={filters.find((filter) => filter.id === "setter")}
              onChange={(event, newValue) => {
                applyFilter("setter", newValue ? newValue.username : null);
              }}
            />

            <Select
              {...boulderFilters.ascent}
              value={filters.find((filter) => filter.id === "ascent")}
              onChange={(event, newValue) => {
                applyFilter("ascent", newValue ? newValue.value : null);
              }}
            />
          </div>

          <GlobalFilter
            filters={filters}
            setFilters={setFilters}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />

          <BoulderTable
            columns={tableColumns}
            data={boulders}
            filters={filters}
            globalFilter={globalFilter}
            onSelectRows={(ids) => setSelected(ids)}
            isAdmin={isAdmin}
            headerClassName={cn(
              styles.tableHeader,
              isAdmin ? styles.isAdminTableHeader : null
            )}
            rowClassName={isAdmin ? styles.isAdminTableRow : styles.tableRow}
            collapsedRowRenderer={(cells) => <CollapsedRow cells={cells} />}
          />

          <Drawer onClose={() => setDetailBoulder(null)}>
            {detailBoulder && <BoulderDetail id={detailBoulder} />}
          </Drawer>

          <Bar visible={selected.length > 0}>
            <span>Selected ({selected.length})</span>

            <span className={styles.barButtons}>
              <Button
                size={"small"}
                variant={"danger"}
                onClick={async () => {
                  try {
                    await http.put("/boulders/mass", {
                      items: selected,
                      operation: "prune-ascents",
                    });

                    await mutate(
                      contextualizedApiPath(currentLocation, "/ascent")
                    );
                    await mutate(
                      contextualizedApiPath(currentLocation, "/boulder")
                    );
                  } catch (error) {
                    dispatchMessage(toast(error));
                  }
                }}
              >
                Prune Ascents
              </Button>

              <Button
                size={"small"}
                variant={"error"}
                onClick={async () => {
                  try {
                    await http.put("/boulders/mass", {
                      items: selected,
                      operation: "deactivate",
                    });

                    await mutate(
                      contextualizedApiPath(currentLocation, "/ascent")
                    );
                    await mutate(
                      contextualizedApiPath(currentLocation, "/boulder")
                    );
                  } catch (error) {
                    dispatchMessage(toast(error));
                  }
                }}
              >
                Deactivate
              </Button>
            </span>
          </Bar>
        </div>
      </div>
    </Layout>
  );
}
