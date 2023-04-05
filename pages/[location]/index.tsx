import utilities from "../../styles/utilities/utilities";
import { useAppContext } from "../_app";

export default function Page() {
  const { tokenPayload } = useAppContext();

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>
        Welcome back {tokenPayload?.username} 👋
      </h1>
    </>
  );
}
