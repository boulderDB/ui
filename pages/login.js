import { useHttp } from "../hooks/useRequest";
import { useContext, useMemo } from "react";
import { AppContext } from "./_app";
import { useRouter } from "next/router";
import toast from "../utilties/toast";
import extractErrorMessage from "../utilties/extractErrorMessage";
import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, typography, colors } from "../styles/utilities";
import cn from "classnames";
import Form from "../components/form/form";
import styles from "./login.module.css";
import Link from "next/link";
import TextField from "../components/textField/textField";

export default function Login() {
  const router = useRouter();
  const globalHttp = useHttp(false, false);

  const formFields = useMemo(() => {
    return [
      {
        name: "username",
        label: "Username / E-Mail",
        Component: TextField,
        componentProps: {},
      },
      {
        name: "password",
        label: "Password",
        Component: TextField,
        componentProps: {
          type: "password",
        },
      },
    ];
  }, []);

  const {
    dispatchMessage,
    setUser,
    setExpiration,
    setLastVisitedLocation,
  } = useContext(AppContext);

  const onSubmit = async (payload) => {
    try {
      const { data } = await globalHttp.post("/login", payload);
      const { expiration, user, targetLocation, location } = data;

      setUser(user);
      setExpiration(expiration);
      setLastVisitedLocation(location);

      if (!targetLocation) {
        router.push(`/setup`);
      } else {
        router.push(`${targetLocation}`);
      }
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title="Login" />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Sign in
        </h1>

        <div className={cn(layoutStyles.sideContent)}>
          <Form submitLabel={"Login"} onSubmit={onSubmit} fields={formFields} />

          <div className={styles.links}>
            <Link href={"/sign-up"}>
              <a className={cn(typography.eta, colors.black)}>Sign up</a>
            </Link>

            <Link href={"/reset-password"}>
              <a className={cn(typography.eta, colors.midGrey)}>
                Reset password
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
