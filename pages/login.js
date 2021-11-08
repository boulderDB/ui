import { useHttp } from "../hooks/useRequest";
import { useContext } from "react";
import { AppContext } from "./_app";
import { useRouter } from "next/router";
import toast from "../utilties/toast";
import extractErrorMessage from "../utilties/extractErrorMessage";
import Layout from "../components/layout/layout";
import Meta from "../components/meta/meta";
import { layoutStyles, textStyles } from "../styles/utilities";
import TextField from "@material-ui/core/TextField";
import cn from "classnames";
import Form from "../components/form/form";

const formFields = [
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

export default function Login() {
  const router = useRouter();
  const globalHttp = useHttp(false, false);

  const {
    dispatchMessage,
    setUser,
    setExpiration,
    setLastVisitedLocation,
    setDevelopmentToken,
  } = useContext(AppContext);

  const onSubmit = async (payload) => {
    try {
      const { data } = await globalHttp.post("/login", payload);
      const { expiration, user, targetLocation, location } = data;

      setUser(user);
      setExpiration(expiration);
      setLastVisitedLocation(location);

      if (data.developmentToken) {
        setDevelopmentToken(data.developmentToken);
      }

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
        <h1 className={cn(textStyles.alpha, layoutStyles.sideTitle)}>
          Please sign in to access BoulderDB.
        </h1>

        <div className={cn(layoutStyles.sideContent)}>
          <Form submitLabel={"Login"} onSubmit={onSubmit} fields={formFields} />
        </div>
      </div>
    </Layout>
  );
}
