import { ChangeEventHandler, useState } from "react";
import { UploadRequest } from "../../lib/types";
import Loader from "../loader/loader";
import styles from "./upload.module.css";

export type UploadProps = {
  name: string;
  value: string;
  label: string;
  onChange: ChangeEventHandler;
  handleUpload: (formData: FormData) => Promise<UploadRequest>;
};

export function Upload({
  name,
  value,
  label = "Upload",
  onChange,
  handleUpload,
}: UploadProps) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${value})` }}
        />
      )}

      <div>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>

        <input
          type="file"
          style={{
            display: "none",
          }}
          id={name}
          name={name}
          onChange={async (event) => {
            try {
              setLoading(true);

              if (event.target.files) {
                const formData = new FormData();
                formData.append("file", event.target.files[0]);

                const data = await handleUpload(formData);

                event.target.value = data.file;

                await onChange(event);
              }
            } catch (error) {
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
    </div>
  );
}