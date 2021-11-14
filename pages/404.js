import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";

export default function NotFound() {
  return (
    <Layout>
      <Meta title={"Page not found"} />
      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Page not found
        </h1>
      </div>
    </Layout>
  );
}
