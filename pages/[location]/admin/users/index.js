import Layout from "../../../../components/layout/layout";
import Meta from "../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import AdminTable from "../../../../components/adminTable/adminTable";
import { useCachedHttp } from "../../../../hooks/useHttp";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../_app";
import Loader from "../../../../components/loader/loader";
import extractRoleName from "../../../../utilties/extractRoleName";
import Button from "../../../../components/button/button";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import styles from "../index.module.css";
import { DetailLinkColumn } from "../index";

const config = {
  title: "Users",
  route: "users",
  schema: "user",
  api: "/users",
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const data = useCachedHttp(`/${currentLocation?.url}${config.api}`);

  const tableData = useMemo(() => {
    if (!data) {
      return [];
    }

    let items = data;

    if (config.archive) {
      items = data.items;
    }

    return items.map((item) => {
      return {
        ...item,
        roles: item.roles
          ?.filter((role) => role.includes(currentLocation.id))
          .map((role) => extractRoleName(currentLocation.id, role)),
        href: `/${currentLocation.url}/admin/${config.route}`,
      };
    });
  }, [data]);

  const columns = useMemo(() => {
    return [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: ({ value }) => {
          return value.join(", ");
        },
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
      <Meta title={`Admin / Users`} />

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

          <Button
            size={"s"}
            href={`/${currentLocation?.url}/admin${config.api}/create`}
          >
            Create
          </Button>
        </div>

        <div className={layoutStyles.sideContent}>
          <AdminTable columns={columns} data={tableData} />
        </div>
      </div>
    </Layout>
  );
}
