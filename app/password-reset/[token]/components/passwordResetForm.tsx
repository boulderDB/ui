"use client";

import { z } from "zod";
import { Form } from "../../../../components/form/_form";
import { api } from "../../../../lib/http";
import { Input } from "../../../../components/input/input";

type PasswordResetFormProps = {
  token: string;
};

export function PasswordResetForm({ token }: PasswordResetFormProps) {
  return (
    <Form
      submitLabel={"Reset"}
      onSubmit={async (values) => {
        await api(`/password-reset/${token}`, "POST", values);
      }}
      fields={[
        {
          name: "password",
          label: "Password",
          type: "password",
          onBlurValidate: z.string().min(6),
          component: Input,
        },
      ]}
    />
  );
}
