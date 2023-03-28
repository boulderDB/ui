"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { post } from "../../../lib/http";
import { Input } from "../../../components/input/input";
import cookies from "js-cookie";
import { TokenPayload } from "../../../lib/types";
import { redirect } from "next/navigation";

export function LoginForm() {
  return (
    <Form
      submitLabel={"Login"}
      onSubmit={async (values) => {
        const tokenPayload = await post<TokenPayload>("/login", values);

        cookies.set("authenticated", true, {
          expires: tokenPayload.expiration - Math.floor(Date.now() / 1000),
        });

        console.log(`/${tokenPayload.lastVisitedLocation.url}`);

        redirect(
          tokenPayload.lastVisitedLocation
            ? `/${tokenPayload.lastVisitedLocation.url}`
            : "foo"
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
