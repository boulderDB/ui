import Avatar from "../avatar/avatar";
import styles from "./userRank.module.css";

type UserRankProps = {
  image?: string | null;
  username: string;
  sentAllBoulders: boolean;
};

export function UserRank({
  image,
  username,
  sentAllBoulders = false,
}: UserRankProps) {
  return (
    <div className={styles.root}>
      <Avatar image={image} />
      <span className={styles.username}>{username}</span>
      {sentAllBoulders && <span className={styles.badge}>🥋</span>}
    </div>
  );
}
