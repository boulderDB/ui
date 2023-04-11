import { Menu, Transition } from "@headlessui/react";
import { Icon } from "../icon/icon";
import utilities from "../../styles/utilities/utilities";
import { Fragment } from "react";
import styles from "./dropdown.module.css";
import cx from "classix";

type DropDownProps<TItem extends { id: string | number; active?: boolean }> = {
  label: string;
  items: TItem[];
  renderItem: (
    props: {
      active: boolean;
      disabled: boolean;
      close: () => void;
    },
    item: TItem
  ) => React.ReactElement | string;
  onClick?: (item: TItem) => void;
  className?: string;
};

export function DropDown<
  TItem extends { id: string | number; active?: boolean }
>({ label, items, renderItem, onClick, className }: DropDownProps<TItem>) {
  return (
    <Menu as="div" className={cx(styles.root, className)}>
      <Menu.Button>
        <span className={utilities.typograpy.delta700}>{label}</span>
        <Icon name="chevronDown" aria-hidden={true} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter={styles.enter}
        enterFrom={styles.enterFrom}
        enterTo={styles.enterTo}
        leave={styles.leave}
        leaveFrom={styles.leaveFrom}
        leaveTo={styles.leaveTo}
      >
        <Menu.Items className={styles.items}>
          {items.map((item, index) => (
            <Menu.Item key={item.id || index}>
              {(props) => (
                <button
                  onClick={() =>
                    typeof onClick === "function" ? onClick(item) : null
                  }
                  className={cx(
                    styles.item,
                    utilities.typograpy.delta700,
                    item.active ? styles.isSelectedItem : null,
                    props.active ? styles.isActiveItem : null
                  )}
                >
                  {props.active}
                  {renderItem(props, item)}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
