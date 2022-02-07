import Meta from "../../../../components/meta/meta";
import Layout from "../../../../components/layout/layout";
import { models } from "../index";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp, useHttp } from "../../../../hooks/useHttp";
import AdminTable from "../../../../components/adminTable/adminTable";
import Button from "../../../../components/button/button";
import Loader from "../../../../components/loader/loader";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import Pagination from "../../../../components/pagination/pagination";
import IndeterminateCheckbox from "../../../../components/table/IndeterminateCheckbox";
import styles from "../../../../components/boulderView/boulderView.module.css";
import Bar from "../../../../components/bar/bar";
import toast from "../../../../utilties/toast";
import { useSWRConfig } from "swr";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const router = useRouter();
  const http = useHttp();
  const { dispatchMessage } = useContext(AppContext);
  const { mutate } = useSWRConfig();

  let { model, page } = router.query;
  page = page ? parseInt(page) : 0;

  const config = models.find((item) => item.route === model);

  let api = `/${currentLocation?.url}${config.api}`;

  let parameters = {
    filter: "all",
  };

  let tableProps = {};

  if (config.archive) {
    api += `/archive`;

    parameters = {
      page,
    };
  }

  if (config.massActions) {
    tableProps.onSelectRows = (ids) => setSelected(ids);
  }

  const data = useCachedHttp(api, parameters);
  const [selected, setSelected] = useState([]);

  const paginationProps = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      pageIndex: page,
      pages: data.pages,
      pageSize: data.size,
      pageCount: data.pages,
      canPreviousPage: data.hasPreviousPage,
      canNextPage: data.hasNextPage,
      nextPage: () => {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page + 1,
          },
        });
      },
      previousPage: () => {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page - 1,
          },
        });
      },
    };
  }, [data, router]);

  const columns = useMemo(() => {
    const items = config.columns;

    if (config.massActions) {
      items.unshift({
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </>
        ),
        Cell: ({ row }) => (
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        ),
      });
    }

    return items;
  }, []);

  const tableData = useMemo(() => {
    if (!data) {
      return [];
    }

    let items = data;

    if (config.archive) {
      items = data.items;
    }

    return items.map((data) => {
      return {
        ...data,
        href: `/${currentLocation.url}/admin${config.api}`,
      };
    });
  }, [data]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / ${config.title}`} />

      <div className={layoutStyles.grid}>
        <div className={cn(layoutStyles.sideTitle)}>
          <h2 className={typography.alpha700}>
            <Breadcrumbs
              items={[
                {
                  title: "Admin",
                  href: `/${currentLocation?.url}/admin`,
                },
                {
                  title: config.title,
                  href: `/${currentLocation?.url}/admin${config.api}`,
                },
              ]}
            />
          </h2>

          <Button
            size={"s"}
            href={`/${currentLocation?.url}/admin${config.api}/create`}
          >
            Create
          </Button>
        </div>

        <div className={layoutStyles.sideContent}>
          <AdminTable
            data={tableData}
            columns={columns}
            sortProperty={config?.sortProperty}
            {...tableProps}
          />

          {config.archive && <Pagination {...paginationProps} />}
        </div>
      </div>

      {config.massActions && (
        <Bar visible={selected.length > 0}>
          <span className={typography.gamma}>Selected ({selected.length})</span>
          <span className={styles.barButtons}>
            {config.massActions.map((action) => {
              return (
                <Button
                  variant={action.buttonVariant}
                  onClick={async () => {
                    try {
                      await action.handle(http, selected, currentLocation);

                      mutate(api + new URLSearchParams(parameters).toString());
                    } catch (error) {
                      dispatchMessage(toast(error));
                    }
                  }}
                >
                  {action.label}
                </Button>
              );
            })}
          </span>
        </Bar>
      )}
    </Layout>
  );
}
