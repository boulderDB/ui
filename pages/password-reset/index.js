import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { colors, layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import Form from "../../components/form/form";
import styles from "../login/index.module.css";
import Link from "next/link";
import { useHttp } from "../../hooks/useHttp";
import { useContext, useMemo } from "react";
import TextField from "../../components/textField/textField";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import { AppContext } from "../_app";
import { useRouter } from "next/router";

export default function Index() {
  const http = useHttp();
  const { dispatchMessage } = useContext(AppContext);
  const router = useRouter();

  const formFields = useMemo(() => {
    return [
      {
        name: "email",
        label: "E-Mail",
        Component: TextField,
        componentProps: {
          type: "email",
        },
      },
    ];
  }, []);

  const onSubmit = async (payload) => {
    try {
      await http.post("/password-reset", payload);

      dispatchMessage(
        toast(
          "Reset request submitted successfully",
          "You will receive instructions on how to reset your password via E-Mail.",
          "success"
        )
      );

      router.push("/login");
    } catch (error) {
      console.error(error);
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title={"Reset password"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(typography.alpha700, layoutStyles.sideTitle)}>
          Request a password reset
        </h1>

        <div className={cn(layoutStyles.sideContent)}>
          <Form
            submitLabel={"Request"}
            onSubmit={onSubmit}
            fields={formFields}
          />

          <div className={styles.links}>
            <Link href={"/sign-up"}>
              <a className={cn(typography.epsilon, colors.black)}>Sign up</a>
            </Link>

            <Link href={"/login"}>
              <a className={cn(typography.epsilon, colors.black)}>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
