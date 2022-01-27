import React, { useContext, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import styles from "./upload.module.css";
import Loader from "../loader/loader";
import toast from "../../utilties/toast";
import { AppContext } from "../../pages/_app";
import extractErrorMessage from "../../utilties/extractErrorMessage";

function defaultValueRenderer(value) {
  return (
    <div
      className={styles.preview}
      style={{ backgroundImage: `url(${value})` }}
    />
  );
}

function Upload({
  name,
  value,
  label,
  renderValue = defaultValueRenderer,
  onSuccess,
}) {
  const { dispatchMessage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const http = useHttp();

  const handleUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await http.post("/upload", formData);

      onSuccess(data.file);
    } catch (error) {
      dispatchMessage(toast("error", extractErrorMessage(error), "error"));
    }

    setLoading(false);
  };

  return (
    <div className={styles.root}>
      {loading ? <Loader /> : renderValue(value)}

      <div>
        <label htmlFor={name} className={styles.label}>
          Upload
        </label>

        <input
          type="file"
          style={{
            display: "none",
          }}
          id={name}
          name={name}
          onChange={async (event) => {
            await handleUpload(event.target?.files[0]);
          }}
        />
      </div>
    </div>
  );
}

export { Upload };
