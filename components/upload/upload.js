import React, { useContext, useState } from "react";
import { useHttp } from "../../hooks/useRequest";
import styles from "./upload.module.css";
import Loader from "../loader/loader";
import toast from "../../utilties/toast";
import { AppContext } from "../../pages/_app";

function defaultValueRenderer(value) {
  return (
    <div
      className={styles.preview}
      style={{ backgroundImage: `url(${value}?w=80&h=80&fit=crop)` }}
    />
  );
}

function Upload({
  name,
  value,
  renderValue = defaultValueRenderer,
  onSuccess,
}) {
  const { dispatchMessage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const globalHttp = useHttp(false);

  const handleUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await globalHttp.post("/upload", formData);

      onSuccess(data.file);
    } catch (error) {
      dispatchMessage(toast("error", error, "error"));
    }

    setLoading(false);
  };

  return (
    <div className={styles.root}>
      {loading ? <Loader /> : renderValue(value)}

      <div>
        <label
          htmlFor={"image"}
          className="button button--primary button--small file-input__button"
        >
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
