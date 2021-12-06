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
import capitalize from "../../../../../utilties/capitalize";

export default function Index() {
  const { query } = useRouter();
  const http = useHttp();
  const { dispatchMessage, currentLocation } = useContext(AppContext);
  const { model } = query;

  const config = models.find((item) => item.route === model);
  const fields = useSchemaForm(config.schema);

  const onSubmit = async (payload) => {
    delete payload.id;

    try {
      await http.post(
        `/${currentLocation?.url}${config.api}`,
        config?.beforeSubmit ? config?.beforeSubmit(payload) : payload
      );
      dispatchMessage(toast("Success", `Created!`, "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title={`Admin / ${config.schema}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Create {capitalize(config.schema)}
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form submitLabel={"Create"} onSubmit={onSubmit} fields={fields} />
        </div>
      </div>
    </Layout>
  );
}
