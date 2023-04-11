import { useRouter } from "next/router";
import utilities from "../../../styles/utilities/utilities";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>
        Create {router.query.resource}
      </h1>
    </>
  );
}
