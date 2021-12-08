import Layout from "../../../components/layout/layout";
import axios from "axios";
import Meta from "../../../components/meta/meta";
import { colors, layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import Form from "../../../components/form/form";
import styles from "../../login/index.module.css";
import Link from "next/link";
import { useContext, useMemo } from "react";
import TextField from "../../../components/textField/textField";
import toast from "../../../utilties/toast";
import extractErrorMessage from "../../../utilties/extractErrorMessage";
import { AppContext } from "../../_app";
import { useRouter } from "next/router";
import { useHttp } from "../../../hooks/useHttp";

export default function Index({ token }) {
  const { dispatchMessage } = useContext(AppContext);

  const router = useRouter();
  const http = useHttp();

  const formFields = useMemo(() => {
    return [
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

  const onSubmit = async (payload) => {
    try {
      await http.post(`/password-reset/${token}`, payload);

      dispatchMessage(
        toast(
          "Your Password was updated",
          " You can now log in again",
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
          Choose your new password wisely
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

export const getServerSideProps = async ({ params }) => {
  const { token } = params;

  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_PROXY}/api/password-reset/${token}`
    );
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      token,
    },
  };
};
