import { useMemo } from "react";
import { Loader } from "../../components/loader/loader";
import { fetcher } from "../../lib/http";
import { Boulder, Tag } from "../../lib/types";
import utilities from "../../styles/utilities/utilities";
import { useAppContext } from "../_app";
import useSWR from "swr";
import { uniqBy } from "../../lib/uniqueBy";
import { Radar } from "react-chartjs-2";
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
  ChartData,
} from "chart.js";
import { util } from "zod";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Page() {
  const { tokenPayload, currentLocation } = useAppContext();
  const { data: boulders } = useSWR<Boulder[]>(
    `/api/${currentLocation?.url}/boulders`,
    fetcher
  );

  const { tagChartData, tags } = useMemo<{
    tagChartData: ChartData<"radar"> | null;
    tags: Tag[];
  }>(() => {
    if (!boulders) {
      return {
        tags: [],
        tagChartData: null,
      };
    }

    const tags = uniqBy(
      boulders.flatMap((boulder) => boulder.tags),
      "id"
    ).reduce<{ [key: number]: { total: number; sent: number } & Tag }>(
      function (accumulator, currentValue) {
        accumulator[currentValue.id] = { ...currentValue, total: 0, sent: 0 };
        return accumulator;
      },
      {}
    );

    boulders.forEach((boulder) => {
      boulder.tags.forEach((tag) => {
        tags[tag.id].total++;

        if (boulder.userAscent) {
          tags[tag.id].sent++;
        }
      });
    });

    const groups = Object.values(tags)
      .map((tag) => {
        return {
          ...tag,
          percentage: Math.round((tag.sent / tag.total) * 100),
        };
      })
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    return {
      tagChartData: {
        labels: groups.map(({ emoji }) => emoji),
        datasets: [
          {
            label: "Percentage of boulders sent for tag",
            data: groups.map(({ percentage }) => percentage),
            backgroundColor: "#cdcefe",
            borderColor: "#5759fb",
            borderWidth: 2,
            pointStyle: "crossRot",
            pointRadius: 5,
            pointHoverRadius: 10,
          },
        ],
      },
      tags: Object.values(tags),
    };
  }, [boulders]);

  if (!boulders) {
    return <Loader />;
  }

  return (
    <h1 className={utilities.typograpy.alpha700}>
      Welcome back {tokenPayload?.username} 👋
      <div>
        <div>
          {tagChartData ? (
            <Radar
              height={400}
              data={tagChartData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          ) : null}
        </div>

        <ul>
          {tags?.map((tag) => (
            <li key={tag.id}>
              {tag.emoji}{" "}
              <span className={utilities.typograpy.delta}>{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </h1>
  );
}
