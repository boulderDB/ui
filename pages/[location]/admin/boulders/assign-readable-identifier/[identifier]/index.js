import Layout from "../../../../../../components/layout/layout";
import { useRouter } from "next/router";
import Meta from "../../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../../styles/utilities";
import React, { useContext } from "react";
import cn from "classnames";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import { AppContext } from "../../../../../_app";
import { useCachedHttp } from "../../../../../../hooks/useHttp";
import Loader from "../../../../../../components/loader/loader";

export default function Index() {
  const { query } = useRouter();
  const { currentLocation } = useContext(AppContext);

  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);

  if (!boulders) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Boulders / Assign / ${query.identifier}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Boulders",
                href: `/${currentLocation?.url}/admin/boulders`,
              },
              {
                title: `Assign readable identifier '${query.identifier}'`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>foo</div>
      </div>
    </Layout>
  );
}
