import Link from "next/link";
import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import styles from "../../styles/utilities/frontPage.module.css";
import { SignUpForm } from "./components/signUpForm";

export const metadata = {
  title: "BoulderDB | Register",
};

export default function Page() {
  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>Sign up</h1>

      <SignUpForm />

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
