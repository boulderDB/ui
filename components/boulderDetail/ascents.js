import isDoubt from "../../utilties/isDoubt";
import { getIcon } from "../ascentIcon/ascentIcon";
import cn from "classnames";
import styles from "./ascents.module.css";
import Button from "../button/button";
import { typography } from "../../styles/utilities";
import { useContext, useEffect, useState } from "react";
import { BoulderDetailContext } from "./boulderDetail";

const ascentPriorities = {
  flash: 3,
  top: 2,
  resignation: 1,
};

export default function Ascents({ ascents }) {
  const { setPage, setPageData } = useContext(BoulderDetailContext);

  return (
    <ul>
      {ascents
        ?.sort((a, b) => {
          return ascentPriorities[a.type] > ascentPriorities[b.type] ? -1 : 1;
        })
        .map((ascent) => {
          const doubted = isDoubt(ascent.type);
          const Icon = getIcon(ascent.type);

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
