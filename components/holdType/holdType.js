import cn from "classnames";
import styles from "./holdType.module.css";
import capitalize from "../../utilties/capitalize";

function HoldType({ image, size = "small", className }) {
  return (
    <div
      className={cn(styles.root, styles[`is${capitalize(size)}`], className)}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={styles.image}
      />
    </div>
  );
}

export default HoldType;
