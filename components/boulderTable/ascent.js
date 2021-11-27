import cn from "classnames";
import styles from "./ascent.module.css";
import capitalize from "../../utilties/capitalize";
import AscentIcon from "../ascentIcon/ascentIcon";

export default function Ascent({ type, checked, disabled, loading, ...rest }) {
  return (
    <div
      className={cn(
        styles.root,
        styles[`is${capitalize(type)}`],
        checked ? styles.isChecked : null,
        disabled ? styles.isDisabled : null,
        loading ? styles.isLoading : null
      )}
      {...rest}
    >
      <AscentIcon type={type} fill={checked} />
    </div>
  );
}
