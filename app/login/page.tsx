import Link from "next/link";
import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import styles from "../../styles/utilities/frontPage.module.css";
import { LoginForm } from "./components/loginForm";
import { isAuthenticated } from "../../lib/api";
import { redirect } from "next/navigation";

export const metadata = {
  title: "BoulderDB | Login",
};

export default function Page() {
  if (isAuthenticated()) {
    redirect("/salon"); // TODO: replace with last visited location
  }

  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Sign in
      </h1>

      <LoginForm />

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
