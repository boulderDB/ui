import React from "react";
import styles from "./pagination.module.css";
import utilities from "../../styles/utilities/utilities";
import { cx } from "classix";
import { Icon } from "../icon/icon";

type PaginationProps = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

export function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}: PaginationProps) {
  const Button = ({ direction }) => {
    const props: {
      className: string;
      onClick?: () => void;
    } = {
      className: cx(
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
        {direction === "forward" ? (
          <Icon name="chevronRight" />
        ) : (
          <Icon name={"chevronLeft"} />
        )}
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
