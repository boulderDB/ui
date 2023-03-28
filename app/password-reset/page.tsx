import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import { PasswordResetForm } from "./components/passwordResetForm";
import Link from "next/link";
import styles from "../../styles/utilities/frontPage.module.css";

export const metadata = {
  title: "BoulderDB | Password reset",
};

export default function Page() {
  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Password reset
      </h1>

      <PasswordResetForm />

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
