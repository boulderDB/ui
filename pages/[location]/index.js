import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, textStyles } from "../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../_app";

export default function Index() {
  const { user } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, textStyles.alpha)}>
          Welcome back {user?.username} 👋
        </h1>

        <div className={layoutStyles.sideContent}></div>
      </div>
    </Layout>
  );
}
