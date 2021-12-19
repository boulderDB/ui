import Form from "../form/form";
import styles from "./adminSearch.module.css";
import { typography } from "../../styles/utilities";
import cn from "classnames";
import React, { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";

export default function AdminSearch({ title, query, fields, renderMatch }) {
  const { dispatchMessage } = useContext(AppContext);
  const [matches, setMatches] = useState([]);

  const onSubmit = async (formData) => {
    try {
      setMatches(await query(formData));
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <div className={styles.root}>
      <div>
        <h2 className={typography.delta700}>{title}</h2>

        <Form submitLabel={"Search"} onSubmit={onSubmit} fields={fields} />
      </div>

      <div className={styles.results}>
        {matches?.length > 0 && (
          <>
            <h2 className={typography.delta700}>Matches:</h2>
            <ul className={styles.resultList}>
              {matches.map((match, index) => (
                <li
                  className={cn(typography.delta, styles.resultItem)}
                  key={index}
                >
                  {renderMatch(match)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
