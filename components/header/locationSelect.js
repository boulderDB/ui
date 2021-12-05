import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import { useRouter } from "next/router";
import styles from "./locationSelect.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import { Downward } from "../icon/icon";

export default function LocationSelect() {
  const { locations, currentLocation } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className={styles.root}>
      <select
        className={cn(styles.select, typography.delta700)}
        value={currentLocation?.url}
        onChange={({ target }) => {
          router.push({
            pathname: router.pathname,
            query: { location: target.value },
          });
        }}
      >
        {locations.map((location) => (
          <option value={location.url} key={location.url}>
            @{location.name}
          </option>
        ))}
      </select>

      <Downward />
    </div>
  );
}
