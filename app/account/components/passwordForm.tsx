"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { api } from "../../../lib/http";
import { Input } from "../../../components/input/input";

export function PasswordForm() {
  return (
    <Form
      submitLabel={"Update password"}
      onSubmit={async (values, form, setSuccess) => {
        await api("/me/password", "PUT", values);

        setSuccess("Password updated sucessfully");
      }}
      fields={[
        {
          name: "currentPassword",
          label: "Current password",
          type: "password",
          onBlurValidate: z.string().nonempty(),
          component: Input,
        },
        {
          name: "newPassword",
          label: "New password",
          type: "password",
          onBlurValidate: z.string().min(4),
          component: Input,
        },
      ]}
    />
  );
}
