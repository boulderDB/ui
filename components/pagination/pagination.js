import React from "react";
import styles from "./pagination.module.css";
import cn from "classnames";
import { Backward, Forward } from "../icon/icon";
import utilities from "../../styles/utilities/utilities";
import { cx } from "classix";

export default function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}) {
  const Button = ({ direction }) => {
    let props = {
      className: cn(
        styles.button,
        direction === "forward" && !canNextPage
          ? styles.isDisabledButton
          : null,
        direction === "backward" && !canPreviousPage
          ? styles.isDisabledButton
          : null
      ),
    };

    if (direction === "forward" && canNextPage) {
      props.onClick = nextPage;
    }

    if (direction === "backward" && canPreviousPage) {
      props.onClick = previousPage;
    }

    return (
      <button {...props}>
        {direction === "forward" ? <Forward /> : <Backward />}
      </button>
    );
  };

  return (
    <div className={styles.root}>
      <span className={cx(styles.info, utilities.typograpy.delta)}>
        {pageIndex * pageSize} - {(pageIndex + 1) * pageSize} of{" "}
        {pageCount * pageSize}
      </span>

      <Button direction={"backward"} />

      <span className={styles.separator} />

      <Button direction={"forward"} />
    </div>
  );
}

Pagination.defaultProps = {
  pageIndex: 0,
  pageSize: 50,
};
