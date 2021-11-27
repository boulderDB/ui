import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../_app";
import Link from "next/link";

export const models = [
  {
    title: "Areas",
    route: "areas",
    schema: "area",
    api: "/areas",
    fields: [
      {
        property: "name",
      },
      {
        property: "active",
      },
    ],
  },
  {
    title: "Walls",
    route: "walls",
    schema: "wall",
    api: "/walls",
    fields: [
      {
        property: "name",
      },
      {
        property: "active",
      },
    ],
  },
  {
    title: "Grades",
    route: "grades",
    schema: "grade",
    api: "/grades",
  },
  {
    title: "Hold types",
    route: "hold-types",
    schema: "holdType",
    api: "/holdtypes",
  },
  {
    title: "Tags",
    route: "tags",
    schema: "tag",
    api: "/tags",
  },
];

export default function Index() {
  const { currentLocation } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={"Admin"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Admin
        </h1>

        <div className={layoutStyles.sideContent}>
          <ul className={styles.links}>
            {models.map((model, index) => (
              <li key={index}>
                <Link href={`/${currentLocation?.url}/admin/${model.route}`}>
                  <a>{model.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}