import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";

export default function Index() {
  return (
    <Layout>
      <Meta title={"Access denied"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Access denied
        </h1>

        <div className={cn(layoutStyles.sideContent)}>img</div>
      </div>
    </Layout>
  );
}
