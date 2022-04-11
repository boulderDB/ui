import Layout from "../../../../components/layout/layout";
import Meta from "../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import AdminTable from "../../../../components/adminTable/adminTable";
import { useCachedHttp } from "../../../../hooks/useHttp";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../_app";
import Loader from "../../../../components/loader/loader";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import styles from "../index.module.css";
import { DetailLinkColumn } from "../index";
import { parseDate } from "../../../../utilties/parseDate";

const config = {
  title: "Reported errors",
  route: "errors",
  schema: "boulderError",
  api: "/boulder-errors",
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);

  let data = useCachedHttp(`/${currentLocation?.url}${config.api}`);

  data = data?.map((item) => {
    return {
      ...item,
      href: `/${currentLocation.url}/admin/${config.route}`,
    };
  });

  const columns = useMemo(() => {
    return [
      {
        Header: "Boulder",
        accessor: "boulder.name",
      },
      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Created at",
        accessor: "createdAt",
        Cell: ({ value }) => parseDate(value),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
      },
    ];
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Reported errors`} />

      <div className={layoutStyles.grid}>
        <div className={layoutStyles.sideTitle}>
          <h2 className={cn(typography.alpha700)}>
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
        </div>

        <div className={layoutStyles.sideContent}>
          <AdminTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
}
