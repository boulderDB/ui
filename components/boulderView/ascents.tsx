import styles from "./ascents.module.css";
import { Ascent as AscentComponent, AscentProps } from "../ascent/ascent";
import cx from "classix";
import { Ascent } from "../../lib/types";
import { capitalize } from "../../lib/capitalize";
import { useState } from "react";
import { isDoubt } from "../../lib/isDoubt";

type AscentsProps = {
  userAscent: Ascent | null;
  variant?: "vertical" | "horizontal";
  onCheck: (type: Ascent["type"]) => Promise<void>;
  onUncheck: () => Promise<void>;
  enableResignation?: boolean;
};

export function Ascents({
  userAscent,
  variant = "horizontal",
  onCheck,
  onUncheck,
  enableResignation = false,
}: AscentsProps) {
  const [pending, setPending] = useState(false);

  function getAscentProps(
    type: Ascent["type"],
    ascent: Ascent | null,
    onCheck: AscentsProps["onCheck"],
    onUncheck: AscentsProps["onUncheck"],
  ): Omit<AscentProps, "className" | "label"> {
    const disabled = ascent ? ascent.type !== type : false;
    const checked = ascent?.type === type;

    return {
      type,
      checked,
      disabled,
      onClick: async () => {
        setPending(true);
        checked ? await onUncheck() : await onCheck(type);
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
        styles[`is${capitalize(variant)}`],
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

      {enableResignation ? (
        <AscentComponent
          label={variant !== "horizontal" ? "Resignation (hide)" : undefined}
          className={styles.item}
          {...getAscentProps("resignation", userAscent, onCheck, onUncheck)}
        />
      ) : null}

      {doubted ? (
        <span className={styles.doubtedLabel}>Ascent doubted!</span>
      ) : null}
    </div>
  );
}
