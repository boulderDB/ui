import styles from "./rankingView.module.css";
import { RankingTable, UserRank } from "../rankingTable/rankingTable";
import { useContext, useMemo } from "react";
import { Female, Male } from "../icon/icon";
import { Progress } from "../progress/progress";
import calculatePercentage from "../../utilties/calculatePercentage";
import { parseDate } from "../../utilties/parseDate";
import Link from "next/link";
import cn from "classnames";
import { colors, typography } from "../../styles/utilities";
import { AppContext } from "../../pages/_app";

export default function RankingView({
  ranking,
  boulderCount,
  userComparison = false,
}) {
  const { tokenPayload, currentLocation } = useContext(AppContext);
  const user = tokenPayload?.user;

  const columns = useMemo(() => {
    return [
      {
        Header: "Rank",
        accessor: "rank",
        className: styles.rankCell,
        Cell: ({ value }) => {
          return <strong>{value}</strong>;
        },
      },
      {
        Header: "User",
        accessor: "user.username",
        className: styles.nameCell,
        Cell: ({ cell, row }) => (
          <UserRank
            username={cell.value}
            image={row.original.user.image}
            sentAllBoulders={row.original.boulder === boulderCount}
          />
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
        Header: "Points",
        accessor: "points",
        className: styles.pointsCell,
      },
      {
        Header: "Boulders",
        accessor: "total.count",
        className: styles.bouldersCell,
        Cell: ({ cell }) => {
          return <Progress percentage={(cell.value / boulderCount) * 100} />;
        },
      },
      {
        Header: "Flashed",
        accessor: "flash.count",
        className: styles.flashedCell,
        Cell: ({ cell }) => calculatePercentage(cell.value, boulderCount),
      },
      {
        Header: "Topped",
        accessor: "top.count",
        gridTemplate: "100px",
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
      {
        Header: "Compare",
        id: "user.id",
        accessor: "user.id",
        className: styles.compareCell,
        Cell: ({ cell }) => {
          if (!userComparison) {
            return null;
          }

          if (parseInt(cell.value) === parseInt(user?.id)) {
            return null;
          }

          return (
            <Link
              href={`/${currentLocation?.url}/boulder/compare/${user?.id}/to/${cell.value}/at/current`}
            >
              <a className={cn(typography.delta700, colors.lila)}>Compare</a>
            </Link>
          );
        },
      },
    ];
  }, [boulderCount, user, userComparison, currentLocation]);

  return (
    <RankingTable
      data={ranking?.map((rank, index) => {
        return {
          ...rank,
          rank: index + 1,
        };
      })}
      columns={columns}
      rowClassName={styles.tableRow}
      headerClassName={styles.tableHeader}
    />
  );
}
