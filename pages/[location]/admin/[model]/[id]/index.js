import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { models } from "../../index";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import Form from "../../../../../components/form/form";
import React, { useContext } from "react";
import { AppContext } from "../../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp, useHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";
import useSchemaForm from "../../../../../hooks/useSchemaForm";
import { useSWRConfig } from "swr";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { model, id },
  } = useRouter();
  const http = useHttp();
  const { dispatchMessage } = useContext(AppContext);
  const { mutate } = useSWRConfig();

  const config = models.find((item) => item.route === model);

  const data = useCachedHttp(`/${currentLocation?.url}${config?.api}/${id}`);

  const { fields } = useSchemaForm(config?.schema);

  const onSubmit = async (payload) => {
    try {
      await http.put(
        `/${currentLocation?.url}${config.api}/${id}`,
        config?.beforeSubmit ? config?.beforeSubmit(payload) : payload
      );

      mutate(`/${currentLocation?.url}${config.api}`);
      mutate(`/${currentLocation?.url}${config.api}/${id}`);

      dispatchMessage(toast("Success", `Updated!`, "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!data || !fields) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin ${data.name}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          {data.name}
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
