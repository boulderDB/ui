import styles from "./filter.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

export default function Filter({
  name,
  items = [],
  onSelect,
  renderItem,
  className,
}) {
  return (
    <div className={cn(styles.root, className)}>
      <span className={cn(typography.gamma, styles.name)}>{name}</span>

      <ul className={styles.options}>
        {items.length > 0 ? (
          items.map((item, index) => {
            return (
              <li
                key={index}
                className={styles.option}
                onClick={() => onSelect(item)}
              >
                {renderItem(item)}
              </li>
            );
          })
        ) : (
          <li>loading...</li>
        )}
      </ul>
    </div>
  );
}
