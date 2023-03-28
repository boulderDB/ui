"use client";

import { useState } from "react";
import styles from "./_header.module.css";
import utilities from "../../styles/utilities/utilities";
import Link from "next/link";
import { Location, TokenPayload } from "../../lib/types";

type HeaderProps = {
  authenticated: boolean;
  tokenPayload: TokenPayload | null;
  currentLocation?: Location;
  backlink: string;
  locations: Location[];
};

export function Header({
  authenticated,
  tokenPayload,
  currentLocation,
  backlink,
  locations,
}: HeaderProps) {
  const [mobileOverlay, setMobileOverlay] = useState<boolean>(false);

  const items = {
    primary: [],
    secondary: [],
  };

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          <Link className={utilities.typograpy.delta700} href={backlink}>
            BoulderDB
          </Link>
        </div>

        <div className={styles.secondary}>
          {authenticated && tokenPayload ? (
            <Link href={"/account"}>[{tokenPayload.username}]</Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
