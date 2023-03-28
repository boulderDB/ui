import cx from "classix";
import styles from "../../../styles/utilities/frontPage.module.css";
import utilities from "../../../styles/utilities/utilities";
import { PasswordResetForm } from "./components/passwordResetForm";

export const metadata = {
  title: "BoulderDB | Password reset",
};

export default function Page({
  params,
}: {
  params: {
    token: string;
  };
}) {
  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Choose your new password
      </h1>

      <PasswordResetForm token={params.token} />
    </div>
  );
}
