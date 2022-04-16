import { useCallback, useContext } from "react";
import mutateApi from "../utilties/mutateApi";
import toast from "../utilties/toast";
import AscentIcon from "../components/ascentIcon/ascentIcon";
import styles from "../components/boulderView/boulderView.module.css";
import RateButton from "../components/boulderTable/rateButton";
import extractErrorMessage from "../utilties/extractErrorMessage";
import { AppContext } from "../pages/_app";
import { useHttp } from "./useHttp";

export default function useAddAscent(event = null, forUser = null) {
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const http = useHttp();

  return useCallback(
    async (boulder, type) => {
      try {
        let params = {};

        if (forUser) {
          params.forUser = forUser?.id;
        }

        await http.post(
          `/${currentLocation?.url}/ascents`,
          {
            boulder: boulder.id,
            type,
          },
          {
            params,
          }
        );

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

        dispatchMessage(
          toast(
            "Ascent added",
            <>
              <span>
                <AscentIcon type={type} fill={true} />+{"points"}
              </span>

              <div className={styles.rating}>
                <span>Leave a rating:</span>

                <RateButton direction={"up"} boulderId={boulder} />

                <span>/</span>

                <RateButton direction={"down"} boulderId={boulder} />
              </div>
            </>,
            "info",
            4000
          )
        );
      } catch (error) {
        dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
      }
    },
    [event, forUser]
  );
}
