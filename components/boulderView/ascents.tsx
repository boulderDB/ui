import styles from "./ascents.module.css";
import { Ascent as AscentComponent, AscentProps } from "../ascent/ascent";
import isDoubt from "../../utilties/isDoubt";
import cx from "classix";
import { Ascent } from "../../lib/types";
import { capitalize } from "../../lib/capitalize";

function getAscentProps(
  type: Ascent["type"],
  ascent: Ascent | null
): Omit<AscentProps, "className" | "label"> {
  const disabled = ascent ? ascent.type !== "flash" : false;
  const checked = ascent?.type === "flash";

  return {
    type,
    checked,
    disabled,
  };
}

type AscentsProps = {
  userAscent: Ascent | null;
  variant?: "vertical" | "horizontal";
};

export function Ascents({ userAscent, variant = "horizontal" }: AscentsProps) {
  const doubted = isDoubt(userAscent?.type);

  return (
    <div
      className={cx(
        styles.root,
        doubted ? styles.isDoubted : null,
        styles[`is${capitalize(variant)}`]
      )}
    >
      <AscentComponent
        label={variant !== "horizontal" ? "Flashed (1st go)" : undefined}
        className={styles.item}
        {...getAscentProps("flash", userAscent)}
      />
      <AscentComponent
        label={variant !== "horizontal" ? "Topped (done)" : undefined}
        className={styles.item}
        {...getAscentProps("top", userAscent)}
        onClick={() => alert()}
      />
      <AscentComponent
        label={variant !== "horizontal" ? "Resignation (hide)" : undefined}
        className={styles.item}
        {...getAscentProps("resignation", userAscent)}
      />

      {doubted ? (
        <span className={styles.doubtedLabel}>Ascent doubted!</span>
      ) : null}
    </div>
  );
}
