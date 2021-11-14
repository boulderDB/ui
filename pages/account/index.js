import Layout from "../../components/layout/layout";
import { useHttp } from "../../hooks/useRequest";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import Meta from "../../components/meta/meta";
import { mutate } from "swr";
import { useContext } from "react";
import { AppContext } from "../_app";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import Form from "../../components/form/form";
import Switch from "../../components/switch/switch";
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import withAuthentication from "../../utilties/withAuthentication";
import TextField from "../../components/textField/textField";
import styles from "./index.module.css";

export default function Index({ settings }) {
  const http = useHttp(false);
  const { dispatchMessage } = useContext(AppContext);

  const settingsFormFields = [
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
        options: settings.notifications,
        renderOption: (option) => `${option.type}@${option.location.name}`,
        getOptionLabel: (option) => `${option.type}@${option.location.name}`,
      },
    },
  ];

  const passwordFormFields = [
    {
      name: "currentPassword",
      label: "Current password",
      Component: TextField,
      componentProps: {
        type: "password",
      },
    },
    {
      name: "newPassword",
      label: "New password",
      Component: TextField,
      componentProps: {
        type: "password",
      },
    },
  ];

  const onSettingsFormSubmit = async (data) => {
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

      dispatchMessage(toast("Success", "Account updated!", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  const onPasswordFormSubmit = async (data) => {
    await http.put("/password", data);

    try {
      dispatchMessage(toast("Success", "Password updated!", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={cn(layoutStyles.grid, styles.section)}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha)}>
          Settings
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Update"}
            onSubmit={onSettingsFormSubmit}
            fields={settingsFormFields}
            defaults={{
              ...settings,
              notifications: settings.notifications.filter(
                (notification) => notification.active === true
              ),
            }}
          />
        </div>
      </div>

      <div className={cn(layoutStyles.grid, styles.section)}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha)}>
          Password
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Update"}
            onSubmit={onPasswordFormSubmit}
            fields={passwordFormFields}
          />
        </div>
      </div>

      <div className={cn(styles.section, layoutStyles.grid)}>
        <Button variant={"danger"} className={layoutStyles.full}>
          Delete account
        </Button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (context) =>
  withAuthentication(context, async (http, location) => {
    try {
      const { data } = await http.get(`/me`);

      return {
        props: {
          settings: data,
        },
      };
    } catch (error) {
      throw error;
    }
  });
