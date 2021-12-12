import Ascent from "./ascent";
import isDoubt from "../../utilties/isDoubt";
import cn from "classnames";
import useSwipeOut from "../../hooks/useSwipeOut";
import styles from "./ascents.module.css";
import Tooltip from "../tooltip/tooltip";

export default function Ascents({ onRemove, onAdd, userAscent, boulderId }) {
  const { close } = useSwipeOut();
  const isDoubted = isDoubt(userAscent?.type);

  return (
    <div className={cn(styles.root, isDoubted ? styles.isDoubted : null)}>
      <Tooltip title={"Flash"}>
        <Ascent
          type="flash"
          disabled={userAscent && userAscent?.type !== "flash"}
          checked={userAscent?.type === "flash"}
          onClick={async () => {
            userAscent
              ? await onRemove(userAscent)
              : await onAdd(boulderId, "flash");

            if (close) {
              close();
            }
          }}
        />
      </Tooltip>

      <Tooltip title={"Top"}>
        <Ascent
          type="top"
          disabled={userAscent && userAscent?.type !== "top"}
          checked={userAscent?.type === "top"}
          onClick={async () => {
            userAscent
              ? await onRemove(userAscent)
              : await onAdd(boulderId, "top");

            if (close) {
              close();
            }
          }}
        />
      </Tooltip>

      <Tooltip title={"Resignation"}>
        <Ascent
          type="resignation"
          disabled={userAscent && userAscent?.type !== "resignation"}
          checked={userAscent?.type === "resignation"}
          onClick={async () => {
            userAscent
              ? await onRemove(userAscent)
              : await onAdd(boulderId, "resignation");

            if (close) {
              close();
            }
          }}
        />
      </Tooltip>

      {isDoubted && (
        <span className={styles.doubtedLabel}>Ascent doubted!</span>
      )}
    </div>
  );
}
