import Layout from "../components/layout/layout";
import { useHttp, useRequest } from "../hooks/useRequest";
import { layoutStyles, textStyles } from "../styles/utilities";
import cn from "classnames";
import Meta from "../components/meta/meta";
import TextField from "@material-ui/core/TextField";
import { mutate } from "swr";
import { useContext, useMemo } from "react";
import { AppContext } from "./_app";
import toast from "../utilties/toast";
import extractErrorMessage from "../utilties/extractErrorMessage";
import Form from "../components/form/form";
import Loader from "../components/loader/loader";
import Switch from "../components/switch/switch";
import Select from "../components/select/select";

export default function Account() {
  const { data } = useRequest("/me", false);
  const http = useHttp(false);
  const { dispatch } = useContext(AppContext);

  const formFields = useMemo(() => {
    if (!data) {
      return null;
    }

    return [
      {
        name: "visible",
        label: "Visible",
        Component: Switch,
        componentProps: {},
      },
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
        componentProps: {},
      },
      {
        name: "notifications",
        label: "Notifications",
        Component: Select,
        componentProps: {
          multiple: true,
          options: data.notifications,
          renderOption: (option) => `${option.type}@${option.location.name}`,
          getOptionLabel: (option) => `${option.type}@${option.location.name}`,
        },
      },
    ];
  }, [data]);

  if (!data) {
    return <Loader />;
  }

  const onSubmit = async (data) => {
    try {
      await http.put("/me", {
        image: data.image,
        email: data.email,
        visible: data.visible,
        firstName: data.firstName,
        lastName: data.lastName,
        notifications: data.notifications.map(
          (notification) => notification.id
        ),
      });

      await mutate("/api/me");

      dispatch(toast("Success", "Account updated!", "success"));
    } catch (error) {
      dispatch(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title={"Account"} />

      <h1 className={cn(layoutStyles.sideTitle, textStyles.alpha)}>Account</h1>

      <div className={layoutStyles.sideContent}>
        <Form
          submitLabel={"Update"}
          onSubmit={onSubmit}
          fields={formFields}
          defaults={{
            ...data,
            notifications: data.notifications.filter(
              (notification) => notification.active === true
            ),
          }}
        />
      </div>
    </Layout>
  );
}
