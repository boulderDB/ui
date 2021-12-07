import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import styles from "./index.module.css";
import { useContext } from "react";
import { AppContext } from "../../_app";
import Link from "next/link";
import filterId from "../../../utilties/filterId";

function deleteCommon(payload) {
  delete payload.id;
  delete payload.behaviours;
  delete payload.createdAt;
  delete payload.updatedAt;
}

export const models = [
  {
    title: "Boulders",
    route: "boulders",
    schema: "boulder",
    api: "/boulders",
    fields: [
      {
        property: "name",
      },
      {
        property: "createdAt",
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      delete payload.comments;
      delete payload.readableIdentifier;
      delete payload.userAscent;
      delete payload.currentPoints;
      delete payload.ascents;

      return {
        ...payload,
        setters: filterId(payload.setters),
        tags: filterId(payload.tags),
        startWall: filterId(payload.startWall),
        endWall: filterId(payload.endWall),
        grade: filterId(payload.grade),
        holdType: filterId(payload.holdType),
        internalGrade: filterId(payload.internalGrade),
        status: filterId(payload.status),
      };
    },
  },
  {
    title: "Users",
    route: "users",
  },
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
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
        walls: filterId(payload.walls),
      };
    },
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
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
      };
    },
  },
  {
    title: "Grades",
    route: "grades",
    schema: "grade",
    api: "/grades",
    fields: [
      {
        property: "name",
      },
      {
        property: "active",
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
      };
    },
  },
  {
    title: "Hold types",
    route: "hold-types",
    schema: "holdType",
    api: "/holdtypes",
    fields: [
      {
        property: "name",
      },
      {
        property: "active",
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
      };
    },
  },
  {
    title: "Tags",
    route: "tags",
    schema: "boulderTag",
    api: "/boulder-tags",
    fields: [
      {
        property: "name",
      },
      {
        property: "emoji",
      },
      {
        property: "active",
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
      };
    },
  },
  {
    title: "Events",
    route: "events",
    schema: "event",
    api: "/events",
    fields: [
      {
        property: "name",
      },
      {
        property: "visible",
      },
      {
        property: "public",
      },
      {
        property: "startDate",
      },
      {
        property: "endDate",
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      delete payload.participants; /* todo: remove */

      return {
        ...payload,
        boulders: filterId(payload.boulders),
      };
    },
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
