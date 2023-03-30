"use client";

import { z } from "zod";
import { Form } from "../../../components/form/_form";
import { api } from "../../../lib/http";
import { Input } from "../../../components/input/input";
import { Select } from "../../../components/select/_select";

const options = [{ id: "male" }, { id: "female" }, { id: "neutral" }];

export function SignUpForm() {
  return (
    <Form<{
      username: string;
      email: string;
      gender: {
        id: string;
      };
      password: string;
    }>
      submitLabel={"Register"}
      onSubmit={async (values) => {
        await api("/register", "POST", {
          ...values,
          gender: values.gender.id,
        });
      }}
      fields={[
        {
          name: "username",
          label: "Username / E-Mail",
          type: "text",
          onChangeValidate: z.string().min(4),
          component: Input,
        },
        {
          name: "email",
          label: "E-Mail",
          type: "email",
          onChangeValidate: z.string().email(),
          component: Input,
        },
        {
          name: "gender",
          label: "Gender",
          getOptionLabel: ({ id }) => id,
          options: options,
          onChangeValidate: z.object(
            {
              id: z.string(),
            },
            {
              errorMap: () => ({
                message: "Please select an option",
              }),
            }
          ),
          component: Select,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          onChangeValidate: z.string().min(6),
          component: Input,
        },
      ]}
    />
  );
}
