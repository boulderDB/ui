import React, { useCallback, useContext } from "react";
import { AppContext } from "../../../../_app";
import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";
import TextField from "../../../../../components/textField/textField";
import AdminSearch from "../../../../../components/adminSearch/adminSearch";
import { useHttp } from "../../../../../hooks/useHttp";
import Button from "../../../../../components/button/button";
import styles from "./index.module.css";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import Form from "../../../../../components/form/form";
import Switch from "../../../../../components/switch/switch";
import { useSWRConfig } from "swr";

export default function Index() {
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const http = useHttp();
  const { mutate } = useSWRConfig();

  const createSetter = useCallback(
    async (data) => {
      try {
        await http.post(`/${currentLocation.url}/setters`, {
          active: true,
          ...data,
        });

        dispatchMessage(
          toast("Successfully added user as setter.", null, "success")
        );

        mutate(`/${currentLocation?.url}/setters`);
      } catch (error) {
        console.error(error.response);
        dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
      }
    },
    [currentLocation]
  );

  return (
    <Layout>
      <Meta title={`Admin / Setters / Create`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Setters",
                href: `/${currentLocation?.url}/admin/setters`,
              },
              {
                title: "Create",
                href: `/${currentLocation?.url}/admin/setters/create`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <AdminSearch
            title={"Add an existing user as a setter:"}
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
              <div className={styles.match}>
                <div>{match.username}</div>
                <Button size={"s"} inverted={true} onClick={createSetter}>
                  Add
                </Button>
              </div>
            )}
          />

          <div className={styles.section}>
            <h2 className={typography.delta700}>
              Add setter without a profile:
            </h2>

            <Form
              submitLabel={"Create"}
              onSubmit={createSetter}
              fields={[
                {
                  name: "username",
                  label: "Username",
                  Component: TextField,
                },
                {
                  name: "active",
                  label: "Active",
                  Component: Switch,
                },
              ]}
              defaults={{
                active: true,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
