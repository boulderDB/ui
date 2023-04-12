import cx from "classix";
import styles from "../styles/pages/frontPage.module.css";
import utilities from "../styles/utilities/utilities";
import Link from "next/link";
import { z } from "zod";
import { Form } from "../components/form/form";
import { Input } from "../components/input/input";
import { PostLoginData } from "../lib/types";
import { useRouter } from "next/router";
import { useAppContext } from "./_app";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { authenticated, tokenPayload, login } = useAppContext();

  useEffect(() => {
    if (authenticated && tokenPayload?.lastVisitedLocation) {
      router.push(`/${tokenPayload?.lastVisitedLocation.url}`);
    }
  }, [authenticated]);

  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>Sign in</h1>

      <Form<PostLoginData>
        submitLabel={"Login"}
        onSubmit={async (values) => {
          await login(values);
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

      <div className={styles.links}>
        <Link
          href={"/sign-up"}
          className={cx(utilities.typograpy.epsilon, utilities.colors.black)}
        >
          Sign up
        </Link>

        <Link
          href={"/password-reset"}
          className={cx(utilities.typograpy.epsilon)}
        >
          Reset password
        </Link>
      </div>
    </div>
  );
}
