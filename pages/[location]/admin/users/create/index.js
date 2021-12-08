import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import React from "react";

export default function Index() {
  return (
    <Layout>
      <Meta title={`Admin / Users / Create`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Create User
        </h1>

        <div className={layoutStyles.sideContent}></div>
      </div>
    </Layout>
  );
}
