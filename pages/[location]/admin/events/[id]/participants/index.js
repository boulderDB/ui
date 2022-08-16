import { useRouter } from "next/router";
import {
  fetchOnceConfig,
  useCachedHttp,
} from "../../../../../../hooks/useHttp";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../../../../_app";
import Loader from "../../../../../../components/loader/loader";
import Layout from "../../../../../../components/layout/layout";
import Meta from "../../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../../styles/utilities";
import cn from "classnames";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import AdminTable from "../../../../../../components/adminTable/adminTable";
import styles from "../../../index.module.css";
import Button from "../../../../../../components/button/button";

export default function Index() {
  const { query } = useRouter();
  const { currentLocation } = useContext(AppContext);

  const event = useCachedHttp(
    `/${currentLocation?.url}/events/${query.id}`,
    null,
    fetchOnceConfig
  );

  const columns = useMemo(() => {
    return [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        accessor: "id",
        className: styles.link,
        Cell: ({ value }) => {
          return (
            <>
              <Button
                inverted={true}
                size={"s"}
                href={`/${currentLocation?.url}/events/${query.id}/boulder?user=${value}`}
              >
                Check boulders
              </Button>
            </>
          );
        },
      },
    ];
  }, []);

  if (!event) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Events / ${event.name} / Participants`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Events",
                href: `/${currentLocation?.url}/admin/events`,
              },
              {
                title: event?.name,
                href: `/${currentLocation?.url}/admin/events/${query.id}`,
              },
              {
                title: "Participants",
                href: null,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <AdminTable
            columns={columns}
            data={event.participants}
            sortProperty={"username"}
          />
        </div>
      </div>
    </Layout>
  );
}
