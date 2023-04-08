import cx from "classix";
import utilities from "../styles/utilities/utilities";
import styles from "../styles/pages/account.module.css";
import { Form } from "../components/form/form";
import { Switch } from "../components/switch/switch";
import { z } from "zod";
import { Upload } from "../components/upload/upload";
import { Input } from "../components/input/input";
import { ChangePasswordRequest } from "../types/GetMeResponse";
import { UploadResponse } from "../lib/types";
import axios from "axios";
import { fetcher } from "../lib/http";
import { useSWRConfig } from "swr";
import { Button } from "../components/button/button";
import useSWR from "swr";
import Loader from "../components/loader/loader";

export default function Page() {
  const { data } = useSWR(`/api/me`, fetcher);
  const { mutate } = useSWRConfig();

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={styles.root}>
      <span className={cx(utilities.typograpy.alpha700)}>Account</span>

      <Form
        data={data}
        submitLabel={"Update account"}
        onSubmit={async (values) => {
          await axios.put(`/api/me`, values);

          mutate("/api/me");
        }}
        fields={[
          {
            name: "image",
            label: "Image",
            type: "text",
            onBlurValidate: z.string().url(),
            component: Upload,
            onUpload: async (formData: FormData) => {
              const { data } = await axios.post<UploadResponse>(
                "/api/upload",
                formData
              );

              return data.file;
            },
          },
          {
            name: "visible",
            label: "Visible",
            description:
              "Please note that if you choose not to be visible, you will not be able to participate in events or see rankings.",
            component: Switch,
          },
          {
            name: "username",
            label: "Username",
            description:
              "After updating your username, you will be redirected to the login page.",
            onBlurValidate: z.string().min(4),
            component: Input,
          },
          {
            name: "email",
            label: "E-Mail",
            type: "email",
            onBlurValidate: z.string().email(),
            component: Input,
          },
        ]}
      />

      <div className={cx(styles.title, utilities.typograpy.alpha700)}>
        Password
      </div>

      <Form
        submitLabel={"Update password"}
        onSubmit={async (values, form, setSuccess) => {
          await axios.put<ChangePasswordRequest>("/api/me/password", values);

          form.reset();
          setSuccess("Password updated sucessfully");
        }}
        fields={[
          {
            name: "currentPassword",
            label: "Current password",
            type: "password",
            onBlurValidate: z.string().nonempty(),
            component: Input,
          },
          {
            name: "newPassword",
            label: "New password",
            type: "password",
            onBlurValidate: z.string().min(4),
            component: Input,
          },
        ]}
      />

      <Button variant={"danger"} className={styles.deleteButton}>
        Delete account
      </Button>
    </div>
  );
}
