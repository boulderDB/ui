import cx from "classix";
import styles from "../styles/pages/frontPage.module.css";
import utilities from "../styles/utilities/utilities";
import Link from "next/link";
import { z } from "zod";
import { Form } from "../components/form/form";
import { Input } from "../components/input/input";
import { Select, createSelectProps } from "../components/select/select";
import axios from "axios";
import { genders } from "../lib/globals";
import { useRouter } from "next/router";
import { useAppContext } from "./_app";
import { useEffect } from "react";
import { GenericOption } from "../lib/types";

export default function Page() {
  const router = useRouter();
  const { authenticated, tokenPayload } = useAppContext();

  useEffect(() => {
    if (authenticated && tokenPayload?.lastVisitedLocation) {
      router.push(`/${tokenPayload.lastVisitedLocation.url}`);
    }
  }, [authenticated]);

  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>Sign up</h1>

      <Form<{
        username: string;
        email: string;
        gender: {
          id: string;
        };
        password: string;
      }>
        submitLabel={"Register"}
        onSubmit={async (values, form, setSuccess) => {
          await axios.post("/api/register", {
            ...values,
            gender: values.gender.id,
          });

          form.reset();
          setSuccess(
            <span>
              Your account has been successfully created. You can now{" "}
              <Link href={"/login"} className={utilities.typograpy.textLink}>
                login here
              </Link>
            </span>
          );
        }}
        fields={[
          {
            name: "username",
            label: "Username / E-Mail",
            type: "text",
            onBlurValidate: z.string().min(4),
            component: Input,
          },
          {
            name: "email",
            label: "E-Mail",
            type: "email",
            onBlurValidate: z.string().email(),
            component: Input,
          },
          {
            name: "gender",
            label: "Gender",
            component: Select,
            ...createSelectProps<GenericOption>({
              options: genders,
              getOptionLabel: (option) => option.name,
            }),
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            onBlurValidate: z.string().min(6),
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
