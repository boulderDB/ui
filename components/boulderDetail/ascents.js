import isDoubt from "../../utilties/isDoubt";
import { getIcon } from "../ascentIcon/ascentIcon";
import cn from "classnames";
import styles from "./ascents.module.css";
import Button from "../button/button";
import { typography } from "../../styles/utilities";
import { useContext, useState } from "react";
import { BoulderDetailContext } from "./boulderDetail";

export default function Ascents({ ascents: all }) {
  const limit = 10;

  const [ascents, setAscents] = useState(all ? all?.slice(0, limit) : []);
  const { setPage, setPageData } = useContext(BoulderDetailContext);

  return (
    <ul>
      {ascents.map((ascent) => {
        const doubted = isDoubt(ascent.type);
        const Icon = getIcon(ascent.type);

        if (ascents.length === limit && ascent.id + 1 === limit) {
          return (
            <li className={cn(styles.listItem)} key={ascent.id}>
              <Button size={"small"} onClick={() => setAscents(all)}>
                show {ascents.length - limit} more
              </Button>
            </li>
          );
        }

        return (
          <li className={styles.listItem} key={ascent.id}>
            <span
              className={cn(
                typography.epsilon,
                styles.ascent,
                doubted ? styles.isDoubtedAscent : null
              )}
            >
              <Icon fill={true} />
              {ascent.user?.username}
            </span>

            {!doubted && ascent.type !== "resignation" && (
              <Button
                size={"s"}
                inverted={true}
                onClick={() => {
                  setPageData({ ascent });
                  setPage("doubt");
                }}
              >
                Doubt it
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
