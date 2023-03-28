"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { post } from "../../../lib/http";
import { Input } from "../../../components/input/input";
import { UploadRequest } from "../../../components/upload/_upload";
import { Switch } from "../../../components/switch/_switch";

export function AccountForm() {
  return (
    <Form
      submitLabel={"Update"}
      onSubmit={async (values) => {
        console.log(values);
      }}
      fields={[
        {
          name: "image",
          label: "Image",
          type: "text",
          component: Upload,
        },
        {
          name: "visible",
          label: "Visible",
          description:
            "Please note that if you choose not to be visible, you will not be able to participate in events or see rankings.",
          component: Switch,
        },
      ]}
    />
  );
}
