import Layout from "../../../../components/layout/layout";
import Meta from "../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import AdminTable from "../../../../components/adminTable/adminTable";
import { useCachedHttp } from "../../../../hooks/useHttp";
import { useContext } from "react";
import { AppContext } from "../../../_app";
import Loader from "../../../../components/loader/loader";
import { renderers } from "../[model]";
import extractRoleName from "../../../../utilties/extractRoleName";
import Button from "../../../../components/button/button";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";

export default function Index() {
  const { currentLocation } = useContext(AppContext);

  let data = useCachedHttp(`/${currentLocation?.url}/users`);

  data = data?.map((item) => {
    const roles = item?.roles?.filter((role) =>
      role.includes(currentLocation.id)
    );

    return {
      ...item,
      roles: roles.map((role) => extractRoleName(currentLocation.id, role)),
    };
  });

  const config = {
    title: "Users",
    route: "users",
    schema: "user",
    api: "/users",
  };

  const columns = [
    {
      property: "username",
      renderer: renderers.TextType,
    },
    {
      property: "visible",
      renderer: renderers.CheckboxType,
    },
    {
      property: "roles",
      renderer: (value) => <>{value.join(", ")}</>,
    },
  ];

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
          <AdminTable columns={columns} data={data} config={config} />
        </div>
      </div>
    </Layout>
  );
}
