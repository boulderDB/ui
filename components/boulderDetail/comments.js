import cn from "classnames";
import { typography } from "../../styles/utilities";
import { useCallback, useContext } from "react";
import { useHttp } from "../../hooks/useHttp";
import { AppContext } from "../../pages/_app";
import contextualizedApiPath from "../../utilties/contextualizedApiPath";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import toast from "../../utilties/toast";
import { mutate } from "swr";
import parseDate from "../../utilties/parseDate";
import styles from "./comment.module.css";

export default function Comments({ boulderId, comments, userId }) {
  const http = useHttp();
  const { dispatchMessage, currentLocation } = useContext(AppContext);

  const onDelete = useCallback(async (id, boulderId) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) {
      return null;
    }

    try {
      await http.delete(`/comment/${id}`);
      mutate(`/${currentLocation?.url}/boulders/${boulderId}`);
    } catch (error) {
      console.error(error.response);
      dispatchMessage(
        toast("Error", extractErrorMessage(error.response), "error")
      );
    }
  }, []);

  return (
    <ul className={styles.root}>
      {comments.length === 0 ? (
        <li className={cn(typography.epsilon)}>Be the first!</li>
      ) : (
        comments.map(({ message, createdAt, author, id }) => (
          <li className={styles.item}>
            <div>{message}</div>

            <div className={styles.itemAuthor}>
              {author.id === userId ? author : "You"}
            </div>

            <div className={styles.itemDate}>{parseDate(createdAt).string}</div>

            {author.id === userId && (
              <button
                onClick={() => onDelete(id, boulderId)}
                className={cn(typography.epsilon, styles.deleteComment)}
              >
                delete
              </button>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
