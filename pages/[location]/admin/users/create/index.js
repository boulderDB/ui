import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import {
  colors,
  layoutStyles,
  typography,
} from "../../../../../styles/utilities";
import cn from "classnames";
import React, { useContext } from "react";
import TextField from "../../../../../components/textField/textField";
import { useHttp } from "../../../../../hooks/useHttp";
import { AppContext } from "../../../../_app";
import Link from "next/link";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";
import AdminSearch from "../../../../../components/adminSearch/adminSearch";

export default function Index() {
  const http = useHttp();
  const { currentLocation } = useContext(AppContext);

  return (
    <Layout>
      <Meta title={`Admin / Users / Create`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Users",
                href: `/${currentLocation?.url}/admin/users`,
              },
              {
                title: "Create",
                href: `/${currentLocation?.url}/admin/users/create`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <AdminSearch
            fields={[
              {
                name: "username",
                label: "Search by username",
                Component: TextField,
              },
            ]}
            query={async (formData) => {
              const { data } = await http.get("/users/search", {
                params: {
                  username: formData.username,
                },
              });

              return data;
            }}
            renderMatch={(match) => (
              <Link href={`/${currentLocation?.url}/admin/users/${match.id}`}>
                <a className={colors.lila}>{match.username}</a>
              </Link>
            )}
          />
        </div>
      </div>
    </Layout>
  );
}
