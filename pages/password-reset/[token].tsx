import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import styles from "../../styles/utilities/frontPage.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { z } from "zod";
import { Form } from "../../components/form/form";
import { Input } from "../../components/input/input";

export default function Page() {
  const { query } = useRouter();

  return (
    <div className={styles.root}>
      <h1
        className={cx(utilities.typograpy.alpha700, utilities.layout.sideTitle)}
      >
        Choose your new password
      </h1>

      <Form
        submitLabel={"Reset"}
        onSubmit={async (values) => {
          await axios.post(`/password-reset/${query.token}`, values);
        }}
        fields={[
          {
            name: "password",
            label: "Password",
            type: "password",
            onBlurValidate: z.string().min(6),
            component: Input,
          },
        ]}
      />
    </div>
  );
}
