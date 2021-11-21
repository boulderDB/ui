import Meta from "../../../../components/meta/meta";
import Layout from "../../../../components/layout/layout";
import { models } from "../index";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import Link from "next/link";
import styles from "./index.module.css";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp } from "../../../../hooks/useHttp";

const renderers = {
  TextType: (value) => value,
  EntityType: (value) => value,
  CheckboxType: (value) => value.toString(),
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const { query } = useRouter();

  const { model } = query;
  const config = models.find((item) => item.route === model);

  const data = useCachedHttp(`/${currentLocation?.url}${config.api}`);
  const schema = useCachedHttp(`/schemas/${config.schema}`);

  const columns = useMemo(() => {
    if (!data || !schema) {
      return [];
    }

    return config?.fields?.map((field) => {
      const fieldSchema = schema?.find((item) => item.name === field.property);
      const renderer = renderers[fieldSchema?.type];

      return {
        ...field,
        renderer,
      };
    });
  }, [schema, data]);

  return (
    <Layout loading={!data || !schema}>
      <Meta title={`Admin ${config.title}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          {config.title}
        </h1>

        <div className={layoutStyles.sideContent}>
          <div className={styles.table}>
            {data?.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`/${currentLocation?.url}/admin/${config.route}/${item.id}`}
                >
                  <a
                    key={index}
                    className={styles.row}
                    style={{
                      gridTemplateColumns: `repeat(${config.fields?.length}, 1fr)`,
                    }}
                  >
                    {columns?.map((column, index) => {
                      const value = item[column.property];

                      return (
                        <div
                          className={cn(styles.cell, typography.delta)}
                          key={index}
                        >
                          {column.renderer(value)}
                        </div>
                      );
                    })}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
