import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import { Header, flexRender } from "@tanstack/react-table";
import { Icon } from "../icon/icon";
import styles from "./tableHeaderCell.module.css";

type TableHeaderProps<TData, TValue> = {
  header: Header<TData, TValue>;
};

export function TableHeaderCell<TData, TValue>({
  header,
}: TableHeaderProps<TData, TValue>) {
  if (header.isPlaceholder) {
    return null;
  }

  return (
    <button
      {...{
        className: cx(utilities.typograpy.delta700, styles.root),
        onClick: header.column.getToggleSortingHandler(),
      }}
    >
      <span>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </span>

      {{
        asc: <Icon name="chevronUp" />,
        desc: <Icon name="chevronDown" />,
      }[header.column.getIsSorted() as string] ?? null}
    </button>
  );
}
