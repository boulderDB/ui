import { useRouter } from "next/router";
import utilities from "../../../styles/utilities/utilities";

export const resources = [
  {
    id: "events",
    label: "Events",
  },
  {
    id: "areas",
    label: "Areas",
  },
  {
    id: "walls",
    label: "Walls",
  },

  {
    id: "grades",
    label: "Grades",
  },
  {
    id: "hold-types",
    label: "Hold types",
  },
  {
    id: "users",
    label: "Users",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>{router.query.resource}</h1>
    </>
  );
}
