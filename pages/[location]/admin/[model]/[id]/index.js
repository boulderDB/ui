import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import withAuthentication from "../../../../../utilties/withAuthentication";
import { models } from "../../index";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import Form from "../../../../../components/form/form";
import Switch from "../../../../../components/switch/switch";
import TextField from "../../../../../components/textField/textField";
import EntitySelect from "../../../../../components/entitySelect/entitySelect";
import React, { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp, useHttp } from "../../../../../hooks/useHttp";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
};

const props = {
  EntityType: {},
};

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { model, id },
  } = useRouter();
  const http = useHttp();

  const config = models.find((item) => item.route === model);

  const schema = useCachedHttp(`/schemas/${config.schema}`);
  const data = useCachedHttp(`/${currentLocation?.url}/${model}/${id}`);

  const items = useMemo(async () => {
    return await Promise.all(
      schema.map(async (item) => {
        if (item.type !== "EntityType") {
          return item;
        }

        const { data } = await http.get(
          `/${currentLocation?.url}${item.schema.resource}`
        );

        item.options = data;

        return item;
      })
    );
  }, [schema, data, currentLocation]);

  const fields = schema.map((field) => {
    let config = {
      name: field.name,
      label: field.name,
      Component: components[field.type],
      componentProps: {},
    };

    if (config.Component === EntitySelect) {
      config.componentProps = {
        renderOption: (option) => option.name,
        getOptionLabel: (option) => option.name,
        options: field.options,
      };
    }

    return config;
  });

  const onSubmit = async () => {};

  return (
    <Layout loading={true}>
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
