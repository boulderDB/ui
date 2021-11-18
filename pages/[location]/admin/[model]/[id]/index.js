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
import React from "react";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
};

const props = {
  EntityType: {},
};

export default function Index({ data, schema }) {
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
export const getServerSideProps = (context) =>
  withAuthentication(context, async (http, location) => {
    const { model, id } = context.params;

    const config = models.find((item) => item.route === model);

    let { data: schema } = await http.get(`/schemas/${config.schema}`);
    const { data } = await http.get(`/${location}/${model}/${id}`);

    schema = await Promise.all(
      schema.map(async (item) => {
        if (item.type !== "EntityType") {
          return item;
        }

        const { data } = await http.get(`/${location}${item.schema.resource}`);
        item.options = data;

        return item;
      })
    );

    return {
      props: {
        data,
        ...models.find((model) => model.route === model),
        schema,
      },
    };
  });
