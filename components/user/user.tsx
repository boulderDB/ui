import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import styles from "./userRank.module.css";
import { Icon } from "../icon/icon";

type UserProps = {
  image?: string | null;
  username: string;
  sentAllBoulders?: boolean;
};

export function User({ image, username, sentAllBoulders = false }: UserProps) {
  return (
    <div className={cx(styles.root, utilities.typograpy.delta)}>
      {image ? (
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className={styles.fallback}>
          <Icon name="avatar" />
        </div>
      )}

      <span className={styles.username}>{username}</span>
      {sentAllBoulders && <span className={styles.badge}>🥋</span>}
    </div>
  );
}
