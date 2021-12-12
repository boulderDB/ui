import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import { useCachedHttp } from "../../hooks/useHttp";
import Loader from "../loader/loader";
import Header from "../boulderDetail/header";
import styles from "./wallDetail.module.css";
import { typography } from "../../styles/utilities";
import cn from "classnames";

export default function WallDetail({ id }) {
  const { currentLocation } = useContext(AppContext);
  const wall = useCachedHttp(`/${currentLocation?.url}/walls/${id}`);

  if (!wall) {
    return <Loader />;
  }

  return (
    <div className={styles.root}>
      <Header title={wall.name} onClose={null} />

      <div className={styles.content}>
        <img src={wall.media} alt={wall.name} className={styles.image} />

        <p className={cn(typography.epsilon, styles.description)}>
          {wall.description}
        </p>
      </div>
    </div>
  );
}
