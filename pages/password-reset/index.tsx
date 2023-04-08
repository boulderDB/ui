import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import Link from "next/link";
import styles from "../../styles/utilities/frontPage.module.css";
import { z } from "zod";
import { Form } from "../../components/form/form";
import { api } from "../../lib/http";
import { Input } from "../../components/input/input";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Password reset
      </h1>

      <Form
        submitLabel={"Request reset"}
        onSubmit={async (values) => {
          await api("/password-reset", "POST", values);
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
