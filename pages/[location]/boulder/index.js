import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { useCachedHttp } from "../../../hooks/useHttp";
import { AppContext } from "../../_app";
import Button from "../../../components/button/button";
import Loader from "../../../components/loader/loader";
import BoulderView from "../../../components/boulderView/boulderView";

export default function Index() {
  const { currentLocation, roles } = useContext(AppContext);
  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);

  if (!boulders) {
    return <Loader />;
  }

  const isAdmin = roles?.includes("admin");

  return (
    <Layout>
      <Meta title={"Boulders"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Boulder ({boulders.length})
          {isAdmin && (
            <Button
              size={"s"}
              inverted={true}
              href={`/${currentLocation?.url}/admin/boulders/create`}
            >
              Create
            </Button>
          )}
        </h1>

        <div className={layoutStyles.sideContent}>
          <BoulderView
            boulders={boulders}
            initialFilters={[
              {
                id: "ascent",
                value: "todo",
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
}
