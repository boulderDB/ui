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

export default function Index() {
  const { currentLocation } = useContext(AppContext);

  const data = useCachedHttp(`/${currentLocation?.url}/users`);

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
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Users
        </h1>

        <div className={layoutStyles.sideContent}>
          <AdminTable columns={columns} data={data} config={config} />
        </div>
      </div>
    </Layout>
  );
}
