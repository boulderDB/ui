import React, { useContext, useMemo } from "react";
import styles from "./header.module.css";
import { AppContext } from "../../pages/_app";
import { typography } from "../../styles/utilities";
import NavItem from "./navItem";
import LocationSelect from "./locationSelect";

export default function Header() {
  const {
    currentLocation,
    isAuthenticated,
    lastLocation,
    tokenPayload,
    reset,
    roles,
    events,
  } = useContext(AppContext);

  console.log(events);

  const items = useMemo(() => {
    const items = {
      primary: [
        () => {
          let href = "/login";
          let label = "BoulderDB";

          if (currentLocation && isAuthenticated) {
            href = `/${currentLocation?.url}`;
          }

          if (!currentLocation && lastLocation && isAuthenticated) {
            href = `/${lastLocation?.url}`;
            label = `back to ${lastLocation?.name}`;
          }

          return (
            <NavItem href={href} className={typography.delta700}>
              {label}
            </NavItem>
          );
        },
        () => {
          return isAuthenticated && currentLocation ? <LocationSelect /> : null;
        },
      ],
      secondary: [],
    };

    if (!isAuthenticated || !currentLocation) {
      return items;
    }

    items.primary.push(() => (
      <NavItem href={`/${currentLocation?.url}/boulder`}>Boulder</NavItem>
    ));

    if (tokenPayload?.user?.visible) {
      items.primary.push(() => (
        <NavItem href={`/${currentLocation?.url}/rankings/current`}>
          Ranking
        </NavItem>
      ));
    }

    items.secondary.push(() => (
      <NavItem href={`/account`}>[{tokenPayload?.user?.username}]</NavItem>
    ));

    if (roles?.includes("admin")) {
      items.secondary.push(() => (
        <NavItem href={`/${currentLocation?.url}/admin`}>Admin</NavItem>
      ));
    }

    items.secondary.push(() => <NavItem onClick={reset}>Logout</NavItem>);

    return items;
  }, [isAuthenticated, roles, currentLocation]);

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          {items.primary.map((Item, index) => (
            <Item key={index} />
          ))}
        </div>

        <div className={styles.secondary}>
          {items.secondary.map((Item, index) => (
            <Item key={index} />
          ))}
        </div>
      </nav>
    </header>
  );
}
