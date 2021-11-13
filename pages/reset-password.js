import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";

export default function ResetPassword() {
  return (
    <Layout>
      <Meta title={"Reset password"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Reset password
        </h1>

        <div className={layoutStyles.sideContent}>123</div>
      </div>
    </Layout>
  );
}
