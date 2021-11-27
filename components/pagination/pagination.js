import React from "react";
import styles from "./pagination.module.css";
import cn from "classnames";
import { Backward, Forward } from "../icon/icon";

export default function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}) {
  return (
    <div className={styles.root}>
      <span className={styles.info}>
        {pageIndex * pageSize} - {(pageIndex + 1) * pageSize} of{" "}
        {pageCount * pageSize}
      </span>

      <span
        onClick={() => previousPage()}
        className={cn(
          styles.button,
          !canPreviousPage ? styles.isDisabledButton : null
        )}
      >
        <Backward />
      </span>

      <span className={styles.separator} />

      <span
        onClick={() => nextPage()}
        className={cn(
          styles.button,
          !canNextPage ? styles.isDisabledButton : null
        )}
      >
        <Forward />
      </span>
    </div>
  );
}
