import Form from "../form/form";
import TextField from "../textField/textField";
import { useCallback, useContext } from "react";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import { useHttp } from "../../hooks/useHttp";
import { AppContext } from "../../pages/_app";
import contextualizedApiPath from "../../utilties/contextualizedApiPath";
import useDrawer from "../../hooks/useDrawer";

const fields = [
  {
    name: "Message",
    label: "message",
    Component: TextField,
    componentProps: {
      area: true,
      required: true,
    },
  },
];

export default function MessageForm({ boulderId, api, name }) {
  const http = useHttp();
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const { toggle } = useDrawer();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await http.post(contextualizedApiPath(currentLocation, api), {
          ...data,
          boulder: boulderId,
        });

        dispatchMessage(toast(`${name} submitted`, null, "success"));
        toggle();
      } catch (error) {
        console.error(error.response);
        dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
      }
    },
    [boulderId, currentLocation]
  );

  return <Form submitLabel={"Send"} onSubmit={onSubmit} fields={fields} />;
}
