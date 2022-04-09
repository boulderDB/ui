import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { useRouter } from "next/router";
import { models } from "../../index";
import useSchemaForm from "../../../../../hooks/useSchemaForm";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import Form from "../../../../../components/form/form";
import React, { useContext } from "react";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import { AppContext } from "../../../../_app";
import { useHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import Breadcrumbs from "../../../../../components/breadcrumbs/breadcrumbs";

export default function Index() {
  const { query } = useRouter();
  const http = useHttp();
  const { dispatchMessage, currentLocation } = useContext(AppContext);

  const config = models.find((item) => item.route === query.model);
  let { fields, defaults } = useSchemaForm(config.schema, "create");

  const onSubmit = async (payload, resetForm) => {
    try {
      await http.post(
        `/${currentLocation?.url}${config.api}`,
        config?.beforeSubmit ? config?.beforeSubmit(payload) : payload
      );

      dispatchMessage(toast("Success", `Created!`, "success"));
      resetForm();
    } catch (error) {
      console.error(error);
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  const FormComponent = config.form ? config.form : Form;

  if (!fields || !defaults) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / ${config.schema}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: config.title,
                href: `/${currentLocation?.url}/admin${config.api}`,
              },
              {
                title: "Create",
                href: `/${currentLocation?.url}/admin${config.api}/create`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <FormComponent
            submitLabel={"Create"}
            onSubmit={onSubmit}
            fields={fields}
            defaults={defaults}
          />
        </div>
      </div>
    </Layout>
  );
}
