import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";
import styles from "./errors.module.css";

export default function NotFound() {
  return (
    <Layout>
      <Meta title={"Page not found"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Page not found
        </h1>

        <div className={cn(layoutStyles.sideContent)}>
          <img
            className={styles.img}
            src={"https://media1.giphy.com/media/hEc4k5pN17GZq/200.gif"}
            alt={"Gbligatory gif"}
          />
        </div>
      </div>
    </Layout>
  );
}
