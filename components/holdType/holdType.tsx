import cx from "classix";
import styles from "./holdType.module.css";
import { capitalize } from "../../lib/capitalize";

type HoldTypeProps = {
  image: string;
  size?: "small" | "large";
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function HoldType({
  image,
  size = "small",
  className,
  ...rest
}: HoldTypeProps) {
  return (
    <div
      className={cx(styles.root, styles[`is${capitalize(size)}`], className)}
      {...rest}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={styles.image}
      />
    </div>
  );
}
