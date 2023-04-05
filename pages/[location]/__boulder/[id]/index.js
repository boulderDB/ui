import Layout from "../../../../components/layout/layout";
import Meta from "../../../../components/meta/meta";
import { useCachedHttp } from "../../../../hooks/useHttp";
import Loader from "../../../../components/loader/loader";
import { useContext } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import Ascents from "../../../../components/boulderTable/ascents";
import useAddAscent from "../../../../hooks/useAddAscent";
import useRemoveAscent from "../../../../hooks/useRemoveAscent";
import HoldType from "../../../../components/holdType/holdType";
import Grade from "../../../../components/grade/grade";
import Tooltip from "../../../../components/tooltip/tooltip";
import { typography } from "../../../../styles/utilities";
import styles from "./index.module.css";

export default function Index() {
  const { query } = useRouter();
  const { currentLocation } = useContext(AppContext);

  const boulder = useCachedHttp(
    `/${currentLocation?.url}/boulders/${query.id}`
  );

  const addHandler = useAddAscent();
  const removeHandler = useRemoveAscent();

  if (!boulder) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Check boulder ${boulder.name}`} />

      <div className={styles.root}>
        <h1 className={typography.alpha700}>{boulder.name}</h1>
        {boulder.startWall.name} > {boulder.endWall.name}
        <div className={styles.row}>
          <span className={styles.label}>Hold:</span>

          <Tooltip title={boulder.holdType.name}>
            <HoldType {...boulder.holdType} size={"large"} />
          </Tooltip>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Grade:</span>
          <Grade {...boulder.grade} />
        </div>
        <div className={styles.row}>
          <Ascents
            onAdd={addHandler}
            onRemove={removeHandler}
            boulder={boulder}
          />
        </div>
      </div>
    </Layout>
  );
}
