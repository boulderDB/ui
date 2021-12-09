import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import {
  colors,
  layoutStyles,
  typography,
} from "../../../../../styles/utilities";
import cn from "classnames";
import React, { useContext, useState } from "react";
import TextField from "../../../../../components/textField/textField";
import Form from "../../../../../components/form/form";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import { useHttp } from "../../../../../hooks/useHttp";
import { AppContext } from "../../../../_app";
import styles from "./index.module.css";
import Link from "next/link";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";

export default function Index() {
  const http = useHttp();
  const { dispatchMessage, currentLocation } = useContext(AppContext);
  const [matches, setMatches] = useState([]);

  const onSubmit = async ({ username }) => {
    try {
      const { data } = await http.get("/users/search", {
        params: {
          username,
        },
      });

      setMatches(data);
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

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
          <Form
            submitLabel={"Search"}
            onSubmit={onSubmit}
            fields={[
              {
                name: "username",
                label: "Search by username",
                Component: TextField,
              },
            ]}
          />

          {matches.length > 0 && (
            <div className={styles.results}>
              <h2 className={typography.gamma}>Matches:</h2>
              <ul className={styles.resultList}>
                {matches.map((match, index) => (
                  <li className={cn(typography.delta, styles.resultItem)}>
                    <Link
                      href={`/${currentLocation?.url}/admin/users/${match.id}`}
                    >
                      <a className={colors.lila}>{match.username}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
