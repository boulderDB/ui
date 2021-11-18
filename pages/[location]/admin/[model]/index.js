import Meta from "../../../../components/meta/meta";
import Layout from "../../../../components/layout/layout";
import withAuthentication from "../../../../utilties/withAuthentication";
import { models } from "../index";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import Link from "next/link";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../../_app";

const renderers = {
  TextType: (value) => value,
  EntityType: (value) => value,
  CheckboxType: (value) => value.toString(),
};

export default function Index({
  data,
  schema,
  title,
  route,
  indexFields: fields,
}) {
  const { currentLocation } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={`Admin ${title}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          {title}
        </h1>

        <div className={layoutStyles.sideContent}>
          <div className={styles.table}>
            {data.map((item, index) => {
              return (
                <Link
                  href={`/${currentLocation?.url}/admin/${route}/${item.id}`}
                >
                  <a
                    key={index}
                    className={styles.row}
                    style={{
                      gridTemplateColumns: `repeat(${fields.length}, 1fr)`,
                    }}
                  >
                    {fields?.map((field) => {
                      const value = item[field.property];
                      const fieldSchema = schema.find(
                        (item) => item.name === field.property
                      );

                      const renderer = renderers[fieldSchema.type];

                      return (
                        <div className={cn(styles.cell, typography.delta)}>
                          {renderer(value)}
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

export const getServerSideProps = (context) =>
  withAuthentication(context, async (http, location) => {
    const { model } = context.params;

    const config = models.find((item) => item.route === model);

    const { data } = await http.get(`/${location}${config.api}`);
    const { data: schema } = await http.get(`/schemas/${config.schema}`);

    return {
      props: {
        data,
        ...config,
        key: "Poop",
        schema,
      },
    };
  });
