import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../_app";

export default function Index() {
  const { user } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha)}>
          Welcome back {user?.username} 👋
        </h1>

        <div className={layoutStyles.sideContent}></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
