import React, { useContext, useMemo } from "react";
import styles from "./header.module.css";
import cn from "classnames";
import { AppContext } from "../../pages/_app";
import { typography } from "../../styles/utilities";
import Link from "next/link";

function NavItem({ href, children, className, onClick, ...rest }) {
  if (onClick) {
    return (
      <span
        className={cn(styles.item, typography.delta, className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href}>
      <a className={cn(styles.item, typography.delta, className)} {...rest}>
        {children}
      </a>
    </Link>
  );
}

export default function Header({ locations }) {
  const {
    currentLocation,
    isAuthenticated,
    lastLocation,
    user,
    isAdmin,
  } = useContext(AppContext);

  const reset = () => {
    alert("alert");
  };

  const menu = useMemo(() => {
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
      ],
      secondary: [],
    };

    if (!isAuthenticated || !currentLocation) {
      return items;
    }

    items.primary.push(() => (
      <NavItem href={`/${currentLocation?.url}/boulder`}>Boulder</NavItem>
    ));

    if (user?.visible) {
      items.primary.push(() => (
        <NavItem href={`/${currentLocation?.url}/rankings/current`}>
          Ranking
        </NavItem>
      ));
    }

    items.secondary.push(
      () => <NavItem href={`/account`}>Account</NavItem>,
      () => <NavItem onClick={reset}>Logout</NavItem>
    );

    if (isAdmin) {
      items.secondary.push(() => (
        <NavItem href={`/${currentLocation?.url}/admin`}>Admin</NavItem>
      ));
    }

    return items;
  }, [isAuthenticated, currentLocation, user]);

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          {menu.primary.map((Item, index) => (
            <Item key={index} />
          ))}
        </div>

        <div className={styles.secondary}>
          {menu.secondary.map((Item, index) => (
            <Item key={index} />
          ))}
        </div>
      </nav>
    </header>
  );

  function LocationSelect() {
    return (
      <select
        className={cn(styles.locationSelect, typography.eta)}
        onChange={(event) => switchLocation(event.target.value)}
      >
        <option value="">{location}</option>

        {locations.map(({ name, url }) => (
          <option value={url} key={name}>
            @{name}
          </option>
        ))}
      </select>
    );
  }
}
