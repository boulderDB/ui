import Ascent from "./ascent";
import isDoubt from "../../utilties/isDoubt";
import cn from "classnames";
import useSwipeOut from "../../hooks/useSwipeOut";
import styles from "./ascents.module.css";
import Tooltip from "../tooltip/tooltip";
import { parseDate } from "../../utilties/parseDate";

export default function Ascents({ onRemove, onAdd, boulder }) {
  const ascent = boulder.userAscent;

  const { close } = useSwipeOut();
  const isDoubted = isDoubt(ascent?.type);
  const date = parseDate(ascent?.createdAt, true);

  return (
    <div className={cn(styles.root, isDoubted ? styles.isDoubted : null)}>
      <Tooltip
        title={
          ascent?.type === "flash" && date ? `Flashed ${date.string}` : "Flash"
        }
      >
        <Ascent
          type="flash"
          disabled={ascent && ascent?.type !== "flash"}
          checked={ascent?.type === "flash"}
          onClick={async () => {
            ascent
              ? await onRemove(boulder, ascent)
              : await onAdd(boulder, "flash");

            if (close) {
              close();
            }
          }}
        />
      </Tooltip>

      <Tooltip
        title={ascent?.type === "top" && date ? `Topped ${date.string}` : "Top"}
      >
        <Ascent
          type="top"
          disabled={ascent && ascent?.type !== "top"}
          checked={ascent?.type === "top"}
          onClick={async () => {
            ascent
              ? await onRemove(boulder, ascent)
              : await onAdd(boulder, "top");

            if (close) {
              close();
            }
          }}
        />
      </Tooltip>

      <Tooltip
        title={
          ascent?.type === "resignation" && date
            ? `Resigned ${date.string}`
            : "Resignation"
        }
      >
        <Ascent
          type="resignation"
          disabled={ascent && ascent?.type !== "resignation"}
          checked={ascent?.type === "resignation"}
          onClick={async () => {
            ascent
              ? await onRemove(boulder, ascent)
              : await onAdd(boulder, "resignation");

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
