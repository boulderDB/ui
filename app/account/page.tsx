import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import { AccountForm } from "./components/accountForm";
import { PasswordForm } from "./components/passwordForm";
import { Button } from "../../components/button/_button";

export const metadata = {
  title: "BoulderDB | Account",
};

export default function Page() {
  return (
    <>
      <div className={utilities.layout.grid}>
        <h1
          className={cx(
            utilities.layout.sideTitle,
            utilities.typograpy.alpha700
          )}
        >
          Account
        </h1>

        <div className={utilities.layout.sideContent}>
          <AccountForm />
        </div>
      </div>

      <div className={utilities.layout.grid}>
        <h1
          className={cx(
            utilities.layout.sideTitle,
            utilities.typograpy.alpha700
          )}
        >
          Password
        </h1>

        <div className={utilities.layout.sideContent}>
          <PasswordForm />
        </div>
      </div>
      
      <div className={cx(utilities.layout.grid)}>
        <div>
          <Button variant={"danger"} className={utilities.layout.full}>
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}
