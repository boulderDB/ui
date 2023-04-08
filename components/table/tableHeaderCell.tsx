import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import { Header, flexRender } from "@tanstack/react-table";
import { Icon } from "../icon/icon";

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
        className: cx(utilities.typograpy.delta700),
        onClick: header.column.getToggleSortingHandler(),
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}

      {{
        asc: <Icon name="chevronUp" />,
        desc: <Icon name="chevronDown" />,
      }[header.column.getIsSorted() as string] ?? null}
    </button>
  );
}
