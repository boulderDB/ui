import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./header.module.css";
import { AppContext } from "../../pages/_app";
import { colors, typography } from "../../styles/utilities";
import NavItem from "./navItem";
import LocationSelect from "./locationSelect";
import { Burger, Close } from "../icon/icon";
import cn from "classnames";
import { useRouter } from "next/router";
import useDocumentScrollLock from "../../hooks/useDocumentScrollLock";
import { useCachedHttp } from "../../hooks/useHttp";

export default function Header() {
  const {
    currentLocation,
    isAuthenticated,
    lastVisitedLocation,
    tokenPayload,
    reset,
    roles,
    locations,
  } = useContext(AppContext);
  const { pathname, query } = useRouter();

  const [mobileNavOverlayVisible, setMobileNavOverlayVisible] = useState(false);

  const [disableScroll, enableScroll] = useDocumentScrollLock({
    disableOnMount: false,
  });

  const events = useCachedHttp(
    isAuthenticated && currentLocation
      ? `/${currentLocation?.url}/events?filter=active`
      : null,
    null,
    null,
    false,
    true,
    []
  );

  useEffect(() => {
    setMobileNavOverlayVisible(false);
  }, [pathname, query]);

  useEffect(() => {
    if (mobileNavOverlayVisible) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [mobileNavOverlayVisible]);

  const Logo = () => {
    let href = "/login";
    let label = "BoulderDB";

    if (currentLocation && isAuthenticated) {
      href = `/${currentLocation?.url}`;
    }

    if (!currentLocation && lastVisitedLocation && isAuthenticated) {
      href = `/${lastVisitedLocation?.url}`;
      label = `back to ${lastVisitedLocation?.name}`;
    }

    return (
      <NavItem href={href} className={typography.delta700}>
        {label}
      </NavItem>
    );
  };

  const items = useMemo(() => {
    const items = {
      primary: [
        () => <Logo />,
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

    if (events && events?.length > 0) {
      events.forEach((event) => {
        items.primary.push(() => (
          <NavItem
            href={`/${currentLocation?.url}/events/${event.id}/boulder`}
            className={colors.lila}
          >
            {event.name}
          </NavItem>
        ));
      });
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
  }, [isAuthenticated, roles, currentLocation, events]);

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

      <nav className={styles.mobileNav}>
        <Logo />
        {mobileNavOverlayVisible ? (
          <Close
            className={styles.mobileNavIcon}
            onClick={() => setMobileNavOverlayVisible(false)}
          />
        ) : (
          <Burger
            className={styles.mobileNavIcon}
            onClick={() => setMobileNavOverlayVisible(true)}
          />
        )}
      </nav>

      <div
        className={cn(
          styles.mobileNavOverlay,
          mobileNavOverlayVisible ? styles.isVisibleMobileNavOverlay : null
        )}
      >
        <ul>
          {items.primary.slice(2).map((Item, index) => (
            <li className={styles.mobileNavItem} key={index}>
              <Item />
            </li>
          ))}
        </ul>

        <ul>
          {items.secondary.map((Item, index) => (
            <li className={styles.mobileNavItem} key={index}>
              <Item />
            </li>
          ))}
        </ul>

        <span className={typography.delta700}>Locations:</span>
        <ul>
          {locations.map((location, index) => (
            <li className={styles.mobileNavItem} key={index}>
              <NavItem href={`/${location.url}`}>{location.name}</NavItem>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
