"use client";

import { z } from "zod";
import { Form } from "../../../../components/form/_form";
import { post } from "../../../../lib/http";
import { Input } from "../../../../components/input/input";

type PasswordResetFormProps = {
  token: string;
};

export function PasswordResetForm({ token }: PasswordResetFormProps) {
  return (
    <Form
      submitLabel={"Reset"}
      onSubmit={async (values) => {
        await post(`/password-reset/${token}`, values);
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