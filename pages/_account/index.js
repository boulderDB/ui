import Layout from "../../components/layout/layout";
import { fetchOnceConfig, useCachedHttp, useHttp } from "../../hooks/useHttp";
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
import Button from "../../components/button/button";
import TextField from "../../components/textField/textField";
import styles from "./index.module.css";
import Loader from "../../components/loader/loader";
import { Upload } from "../../components/upload/upload";
import EntitySelect from "../../components/entitySelect/entitySelect";
import filterId from "../../utilties/filterId";

export default function Index() {
  const http = useHttp();
  const data = useCachedHttp("/me", null, fetchOnceConfig);
  const { dispatchMessage, reset, tokenPayload } = useContext(AppContext);

  const settingsFormFields = [
    {
      name: "image",
      label: "Image",
      Component: Upload,
      componentProps: {},
    },
    {
      name: "visible",
      label: "Visible",
      description:
        "Please note that if you choose not to be visible, you will not be able to participate in events or see rankings.",
      Component: Switch,
      componentProps: {},
    },
    {
      name: "username",
      label: "Username",
      description:
        "After updating your username, you will be redirected to the login page.",
      Component: TextField,
      componentProps: {
        required: true,
      },
    },
    {
      name: "email",
      label: "E-Mail",
      Component: TextField,
      componentProps: {
        required: true,
      },
    },
    {
      name: "notifications",
      label: "Notifications",
      Component: EntitySelect,
      componentProps: {
        multiple: true,
        resource: `/notifications`,
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
        username: data.username,
        notifications: filterId(data.notifications),
      });

      if (data.username !== tokenPayload?.user?.username) {
        reset();

        if (typeof window !== "undefined") {
          window.location.pathname = "/login";
        }

        return;
      }

      await mutate("/me");

      dispatchMessage(toast("Success", "Account updated!", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  const onPasswordFormSubmit = async (data) => {
    try {
      await http.put("/me/password", data);
      dispatchMessage(toast("Success", "Password updated!", "success"));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={cn(layoutStyles.grid, styles.section)}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Settings
        </h1>

        <div className={layoutStyles.sideContent}>
          <Form
            submitLabel={"Update"}
            onSubmit={onSettingsFormSubmit}
            fields={settingsFormFields}
            defaults={data}
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
        <div>
          <Button variant={"danger"} className={layoutStyles.full}>
            Delete account
          </Button>
        </div>
      </div>
    </Layout>
  );
}
