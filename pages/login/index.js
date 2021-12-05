import { useHttp } from "../../hooks/useHttp";
import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../_app";
import { useRouter } from "next/router";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography, colors } from "../../styles/utilities";
import cn from "classnames";
import Form from "../../components/form/form";
import styles from "./index.module.css";
import Link from "next/link";
import TextField from "../../components/textField/textField";

export default function Index() {
  const router = useRouter();
  const http = useHttp();

  const {
    dispatchMessage,
    setTokenPayload,
    isAuthenticated,
    lastLocation,
  } = useContext(AppContext);

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

  useEffect(async () => {
    if (isAuthenticated) {
      await router.push(`${lastLocation.url}`);
    }
  }, [isAuthenticated]);

  const onSubmit = async (payload) => {
    try {
      const { data } = await http.post("/login", payload);
      const { lastVisitedLocation } = data;

      setTokenPayload(data);

      if (!lastVisitedLocation) {
        await router.push(`/setup`);
      } else {
        await router.push(`${lastVisitedLocation.url}`);
      }
    } catch (error) {
      console.error(error);
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
              <a className={cn(typography.epsilon, colors.black)}>Sign up</a>
            </Link>

            <Link href={"/reset-password"}>
              <a className={cn(typography.epsilon, colors.midGrey)}>
                Reset password
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
