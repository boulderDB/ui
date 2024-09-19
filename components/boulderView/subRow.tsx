import { Row } from "@tanstack/react-table";
import { Boulder, Location, User, Event } from "../../lib/types";
import styles from "./subRow.module.css";
import cx from "classix";
import { Ascents } from "./ascents";
import { useSWRConfig } from "swr";
import { addAscent } from "../../lib/addAscent";
import { removeAscent } from "../../lib/removeAscent";
import { useAppContext } from "../../pages/_app";

type SubRowProps = {
  onClose: () => void;
  forUser?: User;
  forEvent?: Event;
} & Row<Boulder>;

export function SubRow({ original, onClose, forUser, forEvent }: SubRowProps) {
  const { mutate } = useSWRConfig();
  const { currentLocation } = useAppContext();

  return (
    <div className={cx(styles.root)}>
      <Ascents
        variant="vertical"
        userAscent={original.userAscent}
        enableResignation={forEvent === undefined}
        onCheck={async (type) => {
          const mutations = await addAscent({
            type,
            boulderId: original.id,
            location: currentLocation as Location,
            forUser,
            forEvent,
          });

          for (const key of mutations) {
            await mutate(key);
          }

          onClose();
        }}
        onUncheck={async () => {
          if (!original.userAscent) {
            return;
          }

          const mutations = await removeAscent({
            ascentId: original.userAscent.id,
            boulderId: original.id,
            location: currentLocation as Location,
            forUser,
            forEvent,
          });

          for (const key of mutations) {
            await mutate(key);
          }

          onClose();
        }}
      />
    </div>
  );
}
