import React from "react";
import styles from "./avatar.module.css";
import { Avatar as AvatarIcon } from "../icon/icon";
import cn from "classnames";

const Avatar = ({ image }) => {
  if (!image) {
    return (
      <div className={cn(styles.root, styles.isFallback)}>
        <AvatarIcon />
      </div>
    );
  }

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url(${image}?w=80&h=80&fit=crop)` }}
    />
  );
};

export default Avatar;
