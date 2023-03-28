"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { post } from "../../../lib/http";
import { Input } from "../../../components/input/input";

export function LoginForm() {
  return (
    <Form
      submitLabel={"Login"}
      onSubmit={async (values) => {
        await post("/login", values);
      }}
      fields={[
        {
          name: "username",
          label: "Username / E-Mail",
          type: "text",
          onBlurValidate: z.string().nonempty(),
          component: Input,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          onBlurValidate: z.string().nonempty(),
          component: Input,
        },
      ]}
    />
  );
}
