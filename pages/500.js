import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";
import styles from "./errors.module.css";

export default function InternalServerError() {
  return (
    <Layout>
      <Meta title={"Internal server error"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Internal server error
        </h1>

        <div className={cn(layoutStyles.sideContent)}>
          <img
            alt={"Gbligatory gif"}
            className={styles.img}
            src={"https://c.tenor.com/onACeTOyiG0AAAAd/wall-climbing-jump.gif"}
          />
        </div>
      </div>
    </Layout>
  );
}
