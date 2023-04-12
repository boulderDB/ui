import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import Link from "next/link";
import styles from "../../styles/utilities/frontPage.module.css";
import { z } from "zod";
import { Form } from "../../components/form/form";
import { Input } from "../../components/input/input";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../_app";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { authenticated, tokenPayload } = useAppContext();

  useEffect(() => {
    if (authenticated && tokenPayload?.lastVisitedLocation) {
      router.push(`/${tokenPayload?.lastVisitedLocation.url}`);
    }
  }, [authenticated]);

  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>Password reset</h1>

      <Form
        submitLabel={"Request reset"}
        onSubmit={async (values, form, setSuccess) => {
          await axios.post("/password-reset", values);

          form.reset();
          setSuccess(
            "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
          );
        }}
        fields={[
          {
            name: "email",
            label: "E-Mail",
            type: "email",
            onBlurValidate: z.string().email(),
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
          href={"/sign-up"}
          className={cx(utilities.typograpy.epsilon, utilities.colors.black)}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
