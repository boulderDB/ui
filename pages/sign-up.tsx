import cx from "classix";
import styles from "../styles/pages/frontPage.module.css";
import utilities from "../styles/utilities/utilities";
import Link from "next/link";
import { z } from "zod";
import { Form } from "../components/form/_form";
import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import axios from "axios";
import { genders } from "../lib/globals";
import { selectValidation } from "../lib/selectValidation";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Sign up
      </h1>

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
          await axios.post("/api/register", {
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
            getOptionLabel: (option) => option.label,
            options: genders,
            onChangeValidate: selectValidation(),
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

      <div className={styles.links}>
        <Link
          href={"/login"}
          className={cx(utilities.typograpy.epsilon, utilities.colors.black)}
        >
          Login
        </Link>

        <Link
          href={"/password-reset"}
          className={cx(utilities.typograpy.epsilon, utilities.colors.black)}
        >
          Reset password
        </Link>
      </div>
    </div>
  );
}
