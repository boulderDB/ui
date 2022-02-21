import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { colors, layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useRouter } from "next/router";
import { useHttp } from "../../hooks/useHttp";
import { useContext, useMemo } from "react";
import TextField from "../../components/textField/textField";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import { AppContext } from "../_app";
import Select from "../../components/select/select";
import Form from "../../components/form/form";
import styles from "../login/index.module.css";
import Link from "next/link";
import extractRoleName from "../../utilties/extractRoleName";

export default function Index() {
  const router = useRouter();
  const http = useHttp();

  const { dispatchMessage } = useContext(AppContext);

  const formFields = useMemo(() => {
    return [
      {
        name: "username",
        label: "Username",
        Component: TextField,
        componentProps: {},
      },
      {
        name: "email",
        label: "E-Mail",
        Component: TextField,
        componentProps: {
          type: "email",
        },
      },
      {
        name: "gender",
        label: "Gender",
        Component: Select,
        componentProps: {
          options: ["male", "female", "neutral"],
        },
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

  const onSubmit = async (payload, reset) => {
    try {
      await http.post("/register", payload);
      await router.push(`/login`);

      dispatchMessage(
        toast(
          "Sign up successful",
          "You can now login to your new account",
          "success"
        )
      );

      reset();
    } catch (error) {
      console.error(error);
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title={"Sign up"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Sign up
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Submit"}
            onSubmit={onSubmit}
            fields={formFields}
          />

          <div className={styles.links}>
            <Link href={"/login"}>
              <a className={cn(typography.epsilon, colors.black)}>Login</a>
            </Link>

            <Link href={"/password-reset"}>
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
