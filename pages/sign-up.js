import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography } from "../styles/utilities";
import cn from "classnames";

export default function SignUp() {
  return (
    <Layout>
      <Meta title={"Create account"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Sign up
        </h1>

        <div className={layoutStyles.sideContent}>x</div>
      </div>
    </Layout>
  );
}
