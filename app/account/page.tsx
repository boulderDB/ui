import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import { AccountForm } from "./components/accountForm";
import { PasswordForm } from "./components/passwordForm";
import { Button } from "../../components/button/_button";
import styles from "./page.module.css";
import axios from "axios";
import { cookies } from "next/headers";

export const metadata = {
  title: "BoulderDB | Account",
};

export default async function Page() {
  const { data } = await axios.get(`https://boulderdb.de/api/me`, {
    headers: {
      Authorization: `Bearer ${cookies().get("BEARER")?.value as string}`,
    },
  });

  return (
    <>
      <div className={styles.root}>
        <span className={cx(utilities.typograpy.alpha700)}>Account</span>

        <AccountForm data={data} />

        <div className={cx(styles.title, utilities.typograpy.alpha700)}>
          Password
        </div>

        <PasswordForm />

        <Button variant={"danger"} className={styles.deleteButton}>
          Delete account
        </Button>
      </div>
    </>
  );
}
