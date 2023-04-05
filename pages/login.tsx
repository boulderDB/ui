import cx from "classix";
import styles from "../styles/pages/frontPage.module.css";
import utilities from "../styles/utilities/utilities";
import Link from "next/link";
import { z } from "zod";
import { Form } from "../components/form/_form";
import { Input } from "../components/input/input";
import cookies from "js-cookie";
import { LoginResponse } from "../lib/types";
import axios from "axios";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Sign in
      </h1>

      <Form
        submitLabel={"Login"}
        onSubmit={async (values) => {
          const { data } = await axios.post<LoginResponse>(
            "/api/login",
            values
          );

          const expires = data.expiration - Math.floor(Date.now() / 1000);

          cookies.set("authenticated", true, {
            expires,
          });

          router.push(
            data.lastVisitedLocation
              ? `/${data.lastVisitedLocation.url}`
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
