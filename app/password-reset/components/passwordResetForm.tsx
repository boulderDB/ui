"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { post } from "../../../lib/http";
import { Input } from "../../../components/input/input";

export function PasswordResetForm() {
  return (
    <Form
      submitLabel={"Request reset"}
      onSubmit={async (values) => {
        await post("/password-reset", values);
      }}
      fields={[
        {
          name: "email",
          label: "E-Mail",
          type: "email",
          onBlurValidate: z.string().email(),
          component: Input,
        }
      ]}
    />
  );
}
