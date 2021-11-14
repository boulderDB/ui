import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";

export default function InternalServerError() {
  return (
    <Layout>
      <Meta title={"Internal server error"} />
      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Internal server error
        </h1>

        <div></div>
      </div>
    </Layout>
  );
}
