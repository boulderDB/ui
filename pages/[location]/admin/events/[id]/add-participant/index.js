import { useRouter } from "next/router";
import {
  fetchOnceConfig,
  useCachedHttp,
  useHttp,
} from "../../../../../../hooks/useHttp";
import React, { useContext } from "react";
import { AppContext } from "../../../../../_app";
import { mutate } from "swr";
import toast from "../../../../../../utilties/toast";
import extractErrorMessage from "../../../../../../utilties/extractErrorMessage";
import Loader from "../../../../../../components/loader/loader";
import Layout from "../../../../../../components/layout/layout";
import Meta from "../../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../../styles/utilities";
import cn from "classnames";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import AdminSearch from "../../../../../../components/adminSearch/adminSearch";
import TextField from "../../../../../../components/textField/textField";
import styles from "../../../setters/create/index.module.css";
import Button from "../../../../../../components/button/button";

export default function Index() {
  const { query } = useRouter();
  const http = useHttp();
  const { currentLocation, dispatchMessage } = useContext(AppContext);

  const event = useCachedHttp(
    `/${currentLocation?.url}/events/${query.id}`,
    null,
    fetchOnceConfig
  );

  const createEventParticipant = async (data) => {
    try {
      await http.post(
        `/${currentLocation?.url}/events/${query.id}/registration`,
        data
      );

      await mutate(`/${currentLocation?.url}/events/${query.id}`);

      dispatchMessage(
        toast("Success", `User added to ${event?.name}`, "success")
      );
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!event) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Events / ${event.name}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Events",
                href: `/${currentLocation?.url}/admin/events`,
              },
              {
                title: event?.name,
                href: `/${currentLocation?.url}/admin/events/${query.id}`,
              },
              {
                title: "Add participant",
                href: null,
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
              <div className={styles.match}>
                <div>{match.username}</div>
                <Button
                  size={"s"}
                  inverted={true}
                  onClick={async () =>
                    await createEventParticipant({ user: match.id })
                  }
                >
                  Add
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  );
}
