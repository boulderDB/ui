import cx from "classix";
import Link from "next/link";
import styles from "../../styles/utilities/frontPage.module.css";
import utilities from "../../../styles/utilities/utilities";

export const metadata = {
  title: "BoulderDB | Password reset",
};

export default function Page() {
  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Choose your new password
      </h1>

      {/* <PasswordResetForm /> */}
    </div>
  );
}
