"use client";

import { Form } from "../../../components/form/_form";
import { Switch } from "../../../components/switch/_switch";
import { z } from "zod";
import { Upload } from "../../../components/upload/_upload";
import { Input } from "../../../components/input/input";
import { ShowMeResponse } from "../../../types/GetMeResponse";

type AccountFormProps = {
  data: ShowMeResponse;
};
export function AccountForm({ data }: AccountFormProps) {
  return (
    <Form
      data={data}
      submitLabel={"Update account"}
      onSubmit={async (values) => {
        console.log(values);
      }}
      fields={[
        {
          name: "image",
          label: "Image",
          type: "text",
          onBlurValidate: z.string().url(),
          component: Upload,
        },
        {
          name: "visible",
          label: "Visible",
          description:
            "Please note that if you choose not to be visible, you will not be able to participate in events or see rankings.",
          component: Switch,
        },
        {
          name: "username",
          label: "Username",
          description:
            "After updating your username, you will be redirected to the login page.",
          onBlurValidate: z.string().min(4),
          component: Input,
        },
        {
          name: "email",
          label: "E-Mail",
          type: "email",
          onBlurValidate: z.string().email(),
          component: Input,
        },
      ]}
    />
  );
}
