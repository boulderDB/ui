import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "../_app";
import Link from "next/link";
import styles from "./index.module.css";
import { useCachedHttp, useHttp } from "../../hooks/useHttp";
import Button from "../../components/button/button";
import { parseDate } from "../../utilties/parseDate";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import { mutate } from "swr";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import filterPresentOptions from "../../utilties/filterPresentOptions";
import { ascentTypes } from "../../components/boulderTable/boulderTable";
import { customProperties } from "../../styles/cssExports";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function EventList({ title, items }) {
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const http = useHttp();

  const registrationHandler = useCallback(async (event) => {
    try {
      if (event.isParticipant) {
        await http.delete(
          `/${currentLocation?.url}/events/${event.id}/registration`
        );

        dispatchMessage(
          toast(`You successfully unregistered from ${title}`, "success")
        );
      } else {
        await http.post(
          `/${currentLocation?.url}/events/${event.id}/registration`
        );

        dispatchMessage(toast(`You are now registered to ${title}`, "success"));
      }

      mutate(`/${currentLocation?.url}/events`);
      mutate(
        `/${currentLocation?.url}/events` +
          new URLSearchParams({
            filter: "upcoming",
          }).toString()
      );
      mutate(
        `/${currentLocation?.url}/events` +
          new URLSearchParams({
            filter: "active",
          }).toString()
      );
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  }, []);

  return (
    <div className={styles.eventList}>
      <h2 className={typography.alpha700}>{title} Events</h2>

      <ul className={styles.links}>
        {items.map((event) => (
          <li className={styles.link}>
            <div>
              <span className={typography.delta700}>{event.name}</span>

              <p className={typography.delta}>
                {parseDate(event.startDate, true).string} –{" "}
                {parseDate(event.endDate, true).string}
              </p>
            </div>

            <Button
              size={"xs"}
              variant={event.isParticipant ? "danger" : "default"}
              inverted={true}
              onClick={async () => await registrationHandler(event)}
            >
              {event.isParticipant ? "Unregister" : "Register"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Index() {
  const { tokenPayload, currentLocation } = useContext(AppContext);
  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);

  const upcoming = useCachedHttp(`/${currentLocation?.url}/events`, {
    filter: "upcoming",
  });

  const active = useCachedHttp(`/${currentLocation?.url}/events`, {
    filter: "active",
  });

  const tagChartData = useMemo(() => {
    if (!boulders) {
      return null;
    }

    let tags = filterPresentOptions(boulders, "tags").reduce(function (
      accumulator,
      currentValue
    ) {
      accumulator[currentValue.id] = { ...currentValue, total: 0, sent: 0 };
      return accumulator;
    },
    {});

    boulders.forEach((boulder) => {
      boulder.tags.forEach((tag) => {
        tags[tag.id].total++;

        if (boulder.userAscent) {
          tags[tag.id].sent++;
        }
      });
    });

    tags = Object.values(tags)
      .map((tag) => {
        return {
          ...tag,
          percentage: Math.round((tag.sent / tag.total) * 100),
        };
      })
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    return {
      labels: tags.map(({ emoji }) => emoji),
      datasets: [
        {
          label: "Percentage of boulders sent for tag",
          data: tags.map(({ percentage }) => percentage),
          backgroundColor: "#cdcefe",
          borderColor: "#5759fb",
          borderWidth: 2,
          pointStyle: "crossRot",
          pointRadius: 5,
          pointHoverRadius: 10,
        },
      ],
    };
  }, [boulders]);

  const ascentChartData = useMemo(() => {
    if (!boulders) {
      return null;
    }

    let grades = filterPresentOptions(boulders, "grade").reduce(function (
      accumulator,
      currentValue
    ) {
      accumulator[currentValue.id] = {
        ...currentValue,
        ...ascentTypes.reduce((accumulator, current) => {
          return { ...accumulator, [current.id]: 0 };
        }, {}),
        total: 0,
      };
      return accumulator;
    },
    {});

    boulders.forEach((boulder) => {
      grades[boulder.grade.id].total++;

      if (boulder.userAscent) {
        grades[boulder.grade.id][boulder.userAscent.type]++;
      } else {
        grades[boulder.grade.id]["todo"]++;
      }
    });

    grades = Object.values(grades)
      .map((grade) => {
        return {
          ...grade,
        };
      })
      .sort((a, b) => (a.position > b.position ? 1 : -1));

    return {
      labels: grades.map((grade) => `Grade ${grade.name}`),
      datasets: ascentTypes.map((ascentType) => {
        console.log();

        return {
          label: ascentType.name,
          data: grades.flatMap((grade) => {
            return grade[ascentType.id];
          }),
          backgroundColor: ascentType.color,
        };
      }),
    };
  }, [boulders]);

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={layoutStyles.grid}>
        <div className={cn(layoutStyles.column, layoutStyles.leftColumn)}>
          <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
            Welcome back {tokenPayload?.user?.username} 👋
          </h1>

          <ul className={styles.links}>
            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/boulder`}>
                <a className={cn(typography.gamma)}>Boulder</a>
              </Link>
            </li>

            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/rankings/current`}>
                <a className={cn(typography.gamma)}>Ranking</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={cn(layoutStyles.column, layoutStyles.rightColumn)}>
          {active && active.length > 0 && (
            <EventList items={active} title={"Current"} />
          )}

          {upcoming && upcoming.length > 0 && (
            <EventList items={upcoming} title={"Upcoming"} />
          )}
        </div>

        <h2 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Your statistics
        </h2>

        <div className={cn(layoutStyles.column, layoutStyles.leftColumn)}>
          {tagChartData ? (
            <Radar
              data={tagChartData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          ) : null}
        </div>

        <div className={cn(layoutStyles.column, layoutStyles.rightColumn)}>
          {ascentChartData ? (
            <Bar
              height={200}
              data={ascentChartData}
              options={{
                backgroundColor: customProperties["--color-black"],
                borderColor: customProperties["--color-black"],
                color: customProperties["--color-black"],
                indexAxis: "y",
                scales: {
                  x: {
                    grid: {
                      color: customProperties["--color-black"],
                    },
                    stacked: true,
                  },
                  y: {
                    grid: {
                      color: customProperties["--color-black"],
                    },
                    stacked: true,
                  },
                },
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
              type={"bar"}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
