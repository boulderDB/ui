import Layout from "../../../../components/layout/layout";
import Meta from "../../../../components/meta/meta";
import { useCachedHttp } from "../../../../hooks/useHttp";
import Loader from "../../../../components/loader/loader";
import { useContext } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import Ascents from "../../../../components/boulderTable/ascents";
import useAddAscent from "../../../../actions/useAddAscent";
import useRemoveAscent from "../../../../actions/useRemoveAscent";
import HoldType from "../../../../components/holdType/holdType";
import Grade from "../../../../components/grade/grade";
import Tooltip from "../../../../components/tooltip/tooltip";
import { typography } from "../../../../styles/utilities";
import styles from "./index.module.css";
import Button from "../../../../components/button/button";

export default function Index() {
  const { query } = useRouter();
  const { currentLocation, roles } = useContext(AppContext);
  const router = useRouter();

  const isAdmin = roles?.includes("admin");

  const boulder = useCachedHttp(
    `/${currentLocation?.url}/boulders/${query.id}`,
    null,
    null,
    false,
    false
  );

  const identifier = useCachedHttp(
    `/${currentLocation?.url}/readable-identifiers/${query.id}`
  );

  const addHandler = useAddAscent();
  const removeHandler = useRemoveAscent();

  if (boulder === null && identifier && isAdmin) {
    const data = JSON.stringify({
      readableIdentifier: identifier,
    });

    return (
      <Layout>
        <Meta title={`Assign identifier to boulder`} />

        <div className={styles.root}>
          <h1 className={typography.alpha700}>
            This identifier is currently not assigned to any boulder.
          </h1>

          <div className={styles.row}>
            <Button
              href={`/${currentLocation?.url}/admin/boulders/assign-readable-identifier/${query.id}`}
            >
              Assign to existing boulder
            </Button>
          </div>

          <div className={styles.row}>
            <Button
              href={`/${currentLocation?.url}/admin/boulders/create?data=${data}`}
            >
              Create new boulder
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (boulder === undefined) {
    return <Loader />;
  }

  if (boulder === null) {
    return router.push("/404");
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
