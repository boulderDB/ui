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
import { addTimeOffset, parseDate } from "../../../utilties/parseDate";
import Label from "../../../components/label/label";
import BoulderForm from "../../../components/boulderForm/boulderForm";

function deleteCommon(payload) {
  delete payload.id;
  delete payload.behaviours;
  delete payload.createdAt;
  delete payload.updatedAt;
}

export const DetailLinkColumn = ({ row, value }) => (
  <Button href={`${value}/${row.original.id}`} inverted={true} size={"s"}>
    ✏️
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
    sortProperty: "name",
    massActions: [
      {
        handle: async (http, items, currentLocation) => {
          await http.put(`/${currentLocation?.url}/boulders/mass`, {
            items,
            operation: "reactivate",
          });
        },
        buttonVariant: "danger",
        label: "Reactivate",
      },
    ],
    form: BoulderForm,
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
        Header: "State",
        accessor: "state",
        Cell: ({ value }) => {
          let variant = "default";

          if (value === "active") {
            variant = "success";
          }

          if (value === "ended") {
            variant = "danger";
          }

          return <Label text={value} variant={variant} />;
        },
      },
      {
        Header: "Start date",
        accessor: "startDate",
        Cell: ({ value }) => (value ? parseDate(value, true)?.string : null),
        sortType: (a, b) => {
          return new Date(a.values.startDate) - new Date(b.values.startDate);
        },
      },
      {
        Header: "End date",
        accessor: "endDate",
        Cell: ({ value }) => (value ? parseDate(value, true)?.string : null),
        sortType: (a, b) => {
          return new Date(a.values.endDate) - new Date(b.values.endDate);
        },
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: ({ row, value }) => {
          return (
            <>
              <Button
                inverted={true}
                size={"s"}
                href={`${value.replace("/admin", "")}/${
                  row.original.id
                }/ranking`}
                variant={"success"}
              >
                Ranking
              </Button>

              <Button
                inverted={true}
                size={"s"}
                href={`${value}/${row.original.id}/add-participant`}
                variant={"success"}
              >
                Add participant
              </Button>

              <Button
                inverted={true}
                size={"s"}
                href={`${value}/${row.original.id}/participants`}
                variant={"default"}
              >
                Participants
              </Button>

              <DetailLinkColumn row={row} value={value} />
            </>
          );
        },
      },
    ],
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      delete payload.isParticipant;
      delete payload.state;

      return {
        ...payload,
        boulders: filterId(payload.boulders),
        participants: filterId(payload.participants),
        startDate: addTimeOffset(payload.startDate),
        endDate: addTimeOffset(payload.endDate),
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
    massActions: [
      {
        handle: async (http, items, currentLocation) => {
          await http.put(`/${currentLocation?.url}/setters/mass`, {
            items,
            operation: "deactivate",
          });
        },
        buttonVariant: "danger",
        label: "Deactivate",
      },
    ],
  },
  {
    title: "Readable identifiers",
    route: "readable-identifiers",
    schema: "readableIdentifier",
    api: "/readable-identifiers",
    sortProperty: "id",
    beforeSubmit: (payload) => {
      deleteCommon(payload);

      return {
        ...payload,
      };
    },
    columns: [
      {
        Header: "Value",
        accessor: "value",
      },
      {
        id: "href",
        accessor: "href",
        className: styles.link,
        Cell: ({ row, value }) => {
          return (
            <>
              <Button
                externalHref={true}
                inverted={true}
                size={"s"}
                href={`/api${value.replace("/admin", "")}/${
                  row.original.value
                }/code`}
              >
                QR Code
              </Button>

              <DetailLinkColumn row={row} value={value} />
            </>
          );
        },
      },
    ],
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
