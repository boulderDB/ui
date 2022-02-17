import { useCallback, useContext } from "react";
import toast from "../utilties/toast";
import extractErrorMessage from "../utilties/extractErrorMessage";
import { AppContext } from "../pages/_app";
import { useHttp } from "../hooks/useHttp";
import mutateApi from "../utilties/mutateApi";

export default function useRemoveAscent(event = null, forUser = null) {
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const http = useHttp();

  return useCallback(
    async (boulder, ascent) => {
      try {
        let params = {};

        if (forUser) {
          params.forUser = forUser?.id;
        }

        await http.delete(`/${currentLocation?.url}/ascents/${ascent.id}`, {
          params,
        });

        mutateApi(`/${currentLocation?.url}/boulders`);

        if (boulder.readableIdentifier) {
          mutateApi(
            `/${currentLocation?.url}/boulders/${boulder.readableIdentifier.value}`
          );
        }

        if (forUser) {
          mutateApi(`/${currentLocation?.url}/events/${event.id}`);
        }

        if (event) {
          mutateApi(`/${currentLocation?.url}/boulders`, {
            event: event.id,
          });
        }

        if (event && forUser) {
          mutateApi(`/${currentLocation?.url}/boulders`, {
            event: event.id,
            forUser: forUser?.id,
          });
        }
      } catch (error) {
        dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
      }
    },
    [event, forUser]
  );
}
