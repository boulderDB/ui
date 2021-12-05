import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { models } from "../../index";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import Form from "../../../../../components/form/form";
import Switch from "../../../../../components/switch/switch";
import TextField from "../../../../../components/textField/textField";
import EntitySelect from "../../../../../components/entitySelect/entitySelect";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp, useHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import toast from "../../../../../utilties/toast";
import extractErrorMessage from "../../../../../utilties/extractErrorMessage";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { model, id },
  } = useRouter();
  const http = useHttp();
  const { dispatchMessage } = useContext(AppContext);

  const config = models.find((item) => item.route === model);

  const schema = useCachedHttp(`/schemas/${config.schema}`);
  const data = useCachedHttp(`/${currentLocation?.url}/${model}/${id}`);
  const [fields, setFields] = useState([]);

  useEffect(async () => {
    if (!schema) {
      return [];
    }

    setFields(
      await Promise.all(
        schema.map(async (field) => {
          let config = {
            name: field.name,
            label: field.name,
            Component: components[field.type],
            componentProps: {},
          };

          if (config.Component === EntitySelect) {
            const { data } = await http.get(
              `/${currentLocation?.url}${field.schema.resource}`
            );

            config.componentProps = {
              renderOption: (option) => option.name,
              getOptionLabel: (option) => option.name,
              options: data,
            };
          }

          return config;
        })
      )
    );
  }, [schema, currentLocation]);

  const onSubmit = async (payload) => {
    delete payload.id;

    try {
      await http.put(
        `/${currentLocation?.url}/${config.api}/${id}`,
        config?.beforeSubmit ? config?.beforeSubmit(payload) : payload
      );
      dispatchMessage(toast("Success", `Updated!`, "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!data) {
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
