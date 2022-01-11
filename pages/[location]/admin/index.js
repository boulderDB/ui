import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../_app";
import Link from "next/link";
import filterId from "../../../utilties/filterId";
import HoldType from "../../../components/holdType/holdType";
import Button from "../../../components/button/button";
import styles from "./index.module.css";
import Grade from "../../../components/grade/grade";
import { columns } from "../../../components/boulderTable/boulderTable";

function deleteCommon(payload) {
  delete payload.id;
  delete payload.behaviours;
  delete payload.createdAt;
  delete payload.updatedAt;
}

export const DetailLinkColumn = ({ row, value }) => (
  <Button href={`${value}/${row.original.id}`} inverted={true} size={"s"}>
    Detail
  </Button>
);

export const models = [
  {
    title: "Boulders",
    route: "boulders",
    schema: "boulder",
    api: "/boulders",
    columns: [
      {
        ...columns.name,
        className: styles.nameCell,
      },
      {
        ...columns.holdType,
        Cell: ({ value }) => <HoldType image={value.image} />,
      },
      {
        ...columns.grade,
        Cell: ({ value }) => (
          <Grade
            name={value.name}
            color={value.color}
            internalName={value.internal?.name}
            internalColor={value.internal?.color}
          />
        ),
      },
      {
        id: "status",
        accessor: "status",
        Header: "Status",
      },
      {
        accessor: "readableIdentifier.value",
        Header: "Readable identifier",
      },
      {
        ...columns.date,
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      delete payload.comments;
      delete payload.userAscent;
      delete payload.currentPoints;
      delete payload.ascents;
      delete payload.areas;

      let data = {
        ...payload,
        setters: filterId(payload.setters),
        tags: filterId(payload.tags),
        startWall: filterId(payload.startWall),
        endWall: filterId(payload.endWall),
        grade: filterId(payload.grade),
        holdType: filterId(payload.holdType),
        internalGrade: filterId(payload.internalGrade),
      };

      if (payload.readableIdentifier) {
        data.readableIdentifier = filterId(payload.readableIdentifier);
      }

      return data;
    },
    archive: true,
    mass: true,
    sortProperty: "name",
  },
  {
    title: "Users",
    route: "users",
    sortProperty: "username",
  },
  {
    title: "Areas",
    route: "areas",
    schema: "area",
    api: "/areas",
    sortProperty: "name",
    columns: [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
    sortProperty: "name",
    columns: [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
    sortProperty: "name",
    columns: [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }) => (
          <Grade name={value} color={row.original.color} />
        ),
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
    route: "holdtypes",
    schema: "holdType",
    api: "/holdtypes",
    sortProperty: "name",
    columns: [
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => <HoldType image={value} />,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
    route: "boulder-tags",
    schema: "boulderTag",
    api: "/boulder-tags",
    sortProperty: "name",
    columns: [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }) => (
          <div>
            {row.original.emoji} {value}
          </div>
        ),
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
    sortProperty: "name",
    columns: [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Start date",
        accessor: "startData",
      },
      {
        Header: "End date",
        accessor: "endDate",
      },
      {
        Header: "Visible",
        accessor: (row) => row.visible.toString(),
      },
      {
        Header: "Public",
        accessor: (row) => row.public.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
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
  {
    title: "Setters",
    route: "setters",
    schema: "setter",
    api: "/setters",
    sortProperty: "username",
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
        user: payload.user?.id,
      };
    },
    columns: [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Active",
        accessor: ({ active }) => active.toString(),
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: DetailLinkColumn,
      },
    ],
  },
  {
    title: "Reported errors",
    route: "errors",
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
          <ul>
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
