import React, { useContext, useCallback, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import styles from "./header.module.css";
import cn from "classnames";
import { AppContext } from "../../pages/_app";
import { Burger, Close } from "../icon/icon";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
        <Link href={`/${lastVisitedLocation.url}`}>
          <a className={styles.logo}>
            {"<-"} back to {lastVisitedLocation.name}
          </a>
        </Link>
      </header>
    );
  }

  return (
    <header className={cn(styles.root, textStyles.eta)}>
      <div className={styles.logo}>
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

        <nav>
          <NavItem href={`/${location}/boulder`}>Boulder</NavItem>

          {user && user.visible && (
            <NavItem href={`/${location}/ranking/current`}>Ranking</NavItem>
          )}

          {isAdmin && <NavItem href={`/${location}/admin`}>Admin</NavItem>}
        </nav>
      </div>

      <nav
        className={cn(
          styles.nav,
          mobileNavOpen ? styles.isOpenMobileNav : null
        )}
        onClick={() => setMobileNavOpen(false)}
      >
        <NavItem href={`/account`}>[{user && user.username}]</NavItem>

        <span onClick={() => reset()} className={styles.navItem}>
          Logout
        </span>
      </nav>

      <div
        className={styles.toggle}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? <Close /> : <Burger />}
      </div>
    </header>
  );
}
