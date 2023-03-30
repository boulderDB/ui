"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { api } from "../../../lib/http";
import { Input } from "../../../components/input/input";
import cookies from "js-cookie";
import { LoginResponse } from "../../../lib/types";
import { redirect } from "next/navigation";

export function LoginForm() {
  return (
    <Form
      submitLabel={"Login"}
      onSubmit={async (values) => {
        const response = await api<LoginResponse>("/login", "POST", values);

        cookies.set("authenticated", true, {
          expires: response.expiration - Math.floor(Date.now() / 1000),
        });

        redirect(
          response.lastVisitedLocation
            ? `/${response.lastVisitedLocation.url}`
            : "/setup"
        );
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
