import React, { useContext, useCallback } from "react";
import { useRequest } from "../../hooks/useRequest";
import styles from "./header.module.css";
import cn from "classnames";
import { AppContext } from "../../pages/_app";
import { textStyles } from "../../styles/utilities";
import Link from "next/link";
import useLocation from "../../hooks/useLocation";

function NavItem({ href, children, ...rest }) {
  return (
    <Link href={href}>
      <a className={cn(styles.navItem)} {...rest}>
        {children}
      </a>
    </Link>
  );
}

function DoubtCountNavItem({ href }) {
  const { data } = useRequest(`/ascent-doubts/count`);

  return <NavItem href={href}>Doubts ({data ? data : 0})</NavItem>;
}

export default function Header() {
  const {
    user,
    isAdmin,
    reset,
    isAuthenticated,
    lastVisitedLocation,
  } = useContext(AppContext);

  const location = useLocation();
  const { data: locations } = useRequest("/locations", false, false);

  const switchLocation = useCallback(
    (locationId) => {
      const newLocation = locations.find(
        (location) => location.id === parseInt(locationId)
      );

      if (!newLocation) {
        return;
      }
    },
    [locations]
  );

  if (!isAuthenticated) {
    return (
      <header className={styles.root}>
        <Link href="/login">
          <a className={styles.logo}>BoulderDB</a>
        </Link>
      </header>
    );
  }

  if (!location && lastVisitedLocation) {
    return (
      <header className={styles.root}>
        <NavItem href={`/${lastVisitedLocation.url}`}>
          back to {lastVisitedLocation.name}
        </NavItem>
      </header>
    );
  }

  return (
    <header className={cn(styles.root, textStyles.eta)}>
      <nav className={styles.logo}>
        <Link href={`/${location}`}>
          <a className={cn(styles.title)}>BoulderDB</a>
        </Link>

        <select
          className={cn(styles.locationSelect, textStyles.eta)}
          onChange={(event) => switchLocation(event.target.value)}
        >
          <option value=""> @{location}</option>

          {locations &&
            locations.map(({ name }) => {
              return (
                <option value={name} key={name}>
                  @{name}
                </option>
              );
            })}
        </select>

        <NavItem href={`/${location}/boulder`}>Boulder</NavItem>

        {user && user.visible && (
          <NavItem href={`/${location}/ranking/current`}>Ranking</NavItem>
        )}

        {isAdmin && <NavItem href={`/${location}/admin`}>Admin</NavItem>}
      </nav>

      <nav>
        <NavItem href={`/account`}>[{user && user.username}]</NavItem>

        <span onClick={() => reset()} className={styles.navItem}>
          Logout
        </span>
      </nav>
    </header>
  );
}
