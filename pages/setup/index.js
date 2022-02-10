import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../_app";
import Link from "next/link";

export default function Index() {
  const { locations } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={"Setup"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Choose your default location:
        </h1>
      </div>

      <div className={cn(layoutStyles.sideContent)}>
        {locations.map((location, index) => (
          <Link key={index} href={`/${location.url}`}>
            {location.name}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
