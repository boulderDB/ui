import React, { Fragment, useMemo } from "react";
import Progress from "../../components/Progress/Progress";
import { Meta } from "../../App";
import Male from "../../components/Icon/Male";
import Female from "../../components/Icon/Female";
import calculatePercentage from "../../helper/calculatePercentage";
import { useRequest } from "../../hooks/useRequest";
import {
  RankingTable,
  UserRank,
} from "../../components/RankingTable/RankingTable";
import { Loader } from "../../components/Loader/Loader";
import styles from "./AllTime.module.css";
import { parseDate } from "../../helper/parseDate";

const AllTime = () => {
  const { data: ranking } = useRequest(`/ranking/all-time`);
  const { data: boulderCount } = useRequest(`/boulder/count`);

  const columns = useMemo(() => {
    return [
      {
        Header: "Rank",
        accessor: "rank",
        Cell: ({ value }) => {
          return <strong>{value}</strong>;
        },
      },
      {
        Header: "User",
        accessor: "user.username",
        Cell: ({ cell, row }) => (
          <UserRank username={cell.value} image={row.original.user.image} />
        ),
      },
      {
        Header: "Gender",
        accessor: "user.gender",
        className: styles.genderCell,
        Cell: ({ cell }) => {
          if (cell.value === "male") {
            return <Male />;
          }

          if (cell.value === "female") {
            return <Female />;
          }

          return "-";
        },
      },
      {
        Header: "Boulders",
        accessor: "boulders",
        className: styles.bouldersCell,
        Cell: ({ cell }) => {
          const percentage = (cell.value / boulderCount) * 100;

          return <Progress percentage={percentage} />;
        },
      },
      {
        Header: "Flashed",
        accessor: "flashes",
        className: styles.flashedCell,
        Cell: ({ cell }) => calculatePercentage(cell.value, boulderCount),
      },
      {
        Header: "Topped",
        accessor: "tops",
        className: styles.toppedCell,
        Cell: ({ cell }) => calculatePercentage(cell.value, boulderCount),
      },
      {
        Header: "Last activity",
        accessor: "user.lastActivity",
        className: styles.lastActivityCell,
        Cell: ({ cell }) => {
          return <span>{parseDate(cell.value).string}</span>;
        },
      },
    ];
  }, [boulderCount]);

  if (!ranking || !boulderCount) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Meta title="AllTime Ranking" />

      <RankingTable
        data={ranking.list}
        columns={columns}
        rowClassName={styles.tableRow}
        headerClassName={styles.tableHeader}
      />
    </Fragment>
  );
};

export { AllTime };
