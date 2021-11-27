import { useHttp } from "../../hooks/useHttp";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import toast from "../../utilties/toast";
import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import cn from "classnames";
import styles from "./rateButton.module.css";

export default function RateButton({
  value,
  direction,
  boulderId,
  disabled = false,
}) {
  const http = useHttp();
  const { dispatchMessage } = useContext(AppContext);

  const onAdd = async () => {
    try {
      await http.post(`/boulder-ratings`, {
        rating: 10,
        boulder: boulderId,
      });

      dispatchMessage(toast("Thanks for your feedback.", null, "success"));
    } catch (error) {
      console.error(error.response);
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  const onRemove = async () => {
    try {
      await http.post(`/boulder-ratings`, {
        rating: 0,
        boulder: boulderId,
      });

      dispatchMessage(toast("Thanks for your feedback.", null, "success"));
    } catch (error) {
      console.error(error.response);
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  };

  return (
    <button
      onClick={!value ? onAdd : onRemove}
      className={cn(styles.root, disabled ? styles.isDisabled : null)}
    >
      {direction === "up" ? "👍" : "👎"}
    </button>
  );
}
