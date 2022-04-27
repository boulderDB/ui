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
import Select from "../../../../../components/select/select";
import extractRoleName from "../../../../../utilties/extractRoleName";
import { mutate } from "swr";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";
import { models } from "../../index";
import { optionRenderers } from "../../../../../components/entitySelect/entitySelect";

const roles = ["ADMIN", "SETTER"];

export default function Index() {
  const { query } = useRouter();
  const http = useHttp();
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const data = useCachedHttp(`/${currentLocation?.url}/users/${query.id}`);

  const config = models.find((item) => item.route === "users");

  const fields = useMemo(() => {
    return [
      {
        name: "roles",
        label: "Roles",
        Component: Select,
        componentProps: {
          multiple: true,
          options: roles.map((role) => `ROLE_${role}@${currentLocation.id}`),
          renderOption: (props, option) =>
            optionRenderers.default(
              props,
              extractRoleName(currentLocation.id, option)
            ),
          getOptionLabel: (option) =>
            extractRoleName(currentLocation.id, option),
        },
      },
    ];
  }, [data]);

  const onSubmit = async (data) => {
    try {
      await http.put(`/${currentLocation?.url}/users/${query.id}`, data);

      await mutate(`/${currentLocation?.url}/users/${query.id}`);
      await mutate(`/${currentLocation?.url}/users`);

      dispatchMessage(toast("Success", "User updated", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / ${config.title} / ${data.username}`} />

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
                title: data.username,
                href: `/${currentLocation?.url}/admin/users/${query.id}`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Update"}
            onSubmit={onSubmit}
            fields={fields}
            defaults={{
              roles: data?.roles?.filter((role) =>
                role.includes(currentLocation.id)
              ),
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
