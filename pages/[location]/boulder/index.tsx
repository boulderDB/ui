import { BoulderView } from "../../../components/boulderView/_boulderView";
import Loader from "../../../components/loader/loader";
import { fetcher } from "../../../lib/http";
import { Boulder } from "../../../lib/types";
import utilities from "../../../styles/utilities/utilities";
import { useAppContext } from "../../_app";
import useSWR from "swr";

export default function Page() {
  const { currentLocation } = useAppContext();
  const { data } = useSWR<Boulder[]>(
    `/api/${currentLocation?.url}/boulders`,
    fetcher
  );

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>Boulder ({data.length})</h1>

      <BoulderView
        data={data}
      />
    </>
  );
}
