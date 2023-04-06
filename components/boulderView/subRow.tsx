import { Row } from "@tanstack/react-table";
import { Boulder } from "../../lib/types";
import styles from "./subRow.module.css";
import cx from "classix";
import { Ascents } from "./ascents";
import { useSWRConfig } from "swr";
import { useAppContext } from "../../pages/_app";
import axios from "axios";

type SubRowProps = {
  onClose: () => void;
} & Row<Boulder>;

export function SubRow({ original, onClose }: SubRowProps) {
  const { mutate } = useSWRConfig();
  const { currentLocation } = useAppContext();

  return (
    <div className={cx(styles.root)}>
      <Ascents
        variant="vertical"
        userAscent={original.userAscent}
        onCheck={async (type) => {
          await axios.post(`/api/${currentLocation?.url}/ascents`, {
            boulder: original.id,
            type,
          });

          await mutate(`/api/${currentLocation?.url}/boulders`);

          onClose();
        }}
        onUncheck={async (type) => {
          await axios.delete(
            `/api/${currentLocation?.url}/ascents/${original.userAscent?.id}`
          );

          await mutate(`/api/${currentLocation?.url}/boulders`);

          onClose();
        }}
      />
    </div>
  );
}
