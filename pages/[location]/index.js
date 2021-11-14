import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../_app";
import Link from "next/link";
import styles from "./index.module.css";

export default function Index() {
  const { tokenPayload, currentLocation } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Welcome back {tokenPayload?.user?.username} 👋
        </h1>

        <div className={layoutStyles.sideContent}>
          <ul className={styles.links}>
            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/boulder`}>
                <a className={cn(typography.gamma)}>Boulder</a>
              </Link>
            </li>

            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/rankings/current`}>
                <a className={cn(typography.gamma)}>Ranking</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
