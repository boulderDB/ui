import Meta from "../../../../components/meta/meta";
import Layout from "../../../../components/layout/layout";
import { models } from "../index";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp } from "../../../../hooks/useHttp";
import AdminTable from "../../../../components/adminTable/adminTable";
import Button from "../../../../components/button/button";
import Loader from "../../../../components/loader/loader";

export const renderers = {
  TextType: (value) => value,
  EntityType: (value) => value,
  CheckboxType: (value) => value.toString(),
  DateTimeType: (value) => value.toString(),
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const { query } = useRouter();

  const { model } = query;
  const config = models.find((item) => item.route === model);

  const data = useCachedHttp(
    `/${currentLocation?.url}${config.api}?filter=all`
  );
  const schema = useCachedHttp(`/schemas/${config.schema}`);

  const columns = useMemo(() => {
    if (!schema) {
      return [];
    }

    return config?.fields?.map((field) => {
      const fieldSchema = schema?.find((item) => item.name === field.property);
      const renderer = fieldSchema?.type
        ? renderers[fieldSchema.type]
        : renderers.TextType;

      return {
        ...field,
        renderer,
      };
    });
  }, [schema]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / ${config.title}`} />

      <div className={layoutStyles.grid}>
        <div className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <h2>{config.title}</h2>

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
