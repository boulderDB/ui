import { Menu, Transition } from "@headlessui/react";
import { Icon } from "../icon/icon";
import utilities from "../../styles/utilities/utilities";
import { Fragment } from "react";
import styles from "./locationSelect.module.css";
import cx from "classix";
import { Location } from "../../lib/types";
import Link from "next/link";
import { useAppContext } from "../../pages/_app";

type LocationSelectProps = {
  locations: Location[];
};

export function LocationSelect({ locations }: LocationSelectProps) {
  const { currentLocation } = useAppContext();

  return (
    <Menu as="div" className={styles.root}>
      <Menu.Button>
        <span className={utilities.typograpy.delta700}>
          @{currentLocation?.name}
        </span>
        
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
          {locations.map((location) => (
            <Menu.Item key={location.id}>
              {({ active }) => (
                <Link
                  href={`/${location.url}`}
                  className={cx(
                    styles.item,
                    active ? styles.isActiveItem : null,
                    utilities.typograpy.delta700
                  )}
                >
                  {location.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
