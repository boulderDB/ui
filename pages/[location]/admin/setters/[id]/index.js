import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import { useRouter } from "next/router";
import { useCachedHttp, useHttp } from "../../../../../hooks/useHttp";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../../../_app";
import Loader from "../../../../../components/loader/loader";
import Form from "../../../../../components/form/form";
import { mutate } from "swr";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";
import Switch from "../../../../../components/switch/switch";

export default function Index() {
  const { query } = useRouter();
  const http = useHttp();
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const data = useCachedHttp(`/${currentLocation?.url}/setters/${query.id}`);

  const fields = useMemo(() => {
    return [
      {
        name: "active",
        label: "Active",
        Component: Switch,
        componentProps: {},
      },
    ];
  }, []);

  const onSubmit = async (data) => {
    try {
      await http.put(`/${currentLocation?.url}/setters/${query.id}`, data);

      await mutate(`/${currentLocation?.url}/setters/${query.id}`);
      await mutate(`/${currentLocation?.url}/setters`);

      dispatchMessage(toast("Success", "Setter updated", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Setters`} />

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
                title: data.username,
                href: `/${currentLocation?.url}/admin/setters/${query.id}`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Update"}
            onSubmit={onSubmit}
            fields={fields}
            defaults={data}
          />
        </div>
      </div>
    </Layout>
  );
}
