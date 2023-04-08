import styles from "./ascents.module.css";
import { Ascent as AscentComponent, AscentProps } from "../ascent/ascent";
import isDoubt from "../../utilties/isDoubt";
import cx from "classix";
import { Ascent } from "../../lib/types";
import { capitalize } from "../../lib/capitalize";
import { useState } from "react";

type AscentsProps = {
  userAscent: Ascent | null;
  variant?: "vertical" | "horizontal";
  onCheck: (type: Ascent["type"]) => Promise<void>;
  onUncheck: () => Promise<void>;
};

export function Ascents({
  userAscent,
  variant = "horizontal",
  onCheck,
  onUncheck,
}: AscentsProps) {
  const [pending, setPending] = useState(false);

  function getAscentProps(
    type: Ascent["type"],
    ascent: Ascent | null,
    onCheck: AscentsProps["onCheck"],
    onUncheck: AscentsProps["onUncheck"]
  ): Omit<AscentProps, "className" | "label"> {
    const disabled = ascent ? ascent.type !== type : false;
    const checked = ascent?.type === type;

    return {
      type,
      checked,
      disabled,
      onClick: async () => {
        setPending(true);
        checked ? await onUncheck(type) : await onCheck(type);
        setPending(false);
      },
    };
  }

  const doubted = isDoubt(userAscent?.type);

  return (
    <div
      className={cx(
        styles.root,
        pending ? styles.isPending : null,
        doubted ? styles.isDoubted : null,
        styles[`is${capitalize(variant)}`]
      )}
    >
      <AscentComponent
        label={variant !== "horizontal" ? "Flashed (1st go)" : undefined}
        className={styles.item}
        {...getAscentProps("flash", userAscent, onCheck, onUncheck)}
      />

      <AscentComponent
        label={variant !== "horizontal" ? "Topped (done)" : undefined}
        className={styles.item}
        {...getAscentProps("top", userAscent, onCheck, onUncheck)}
      />

      <AscentComponent
        label={variant !== "horizontal" ? "Resignation (hide)" : undefined}
        className={styles.item}
        {...getAscentProps("resignation", userAscent, onCheck, onUncheck)}
      />

      {doubted ? (
        <span className={styles.doubtedLabel}>Ascent doubted!</span>
      ) : null}
    </div>
  );
}
