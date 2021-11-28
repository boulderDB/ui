import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import { useRouter } from "next/router";

export default function LocationSelect() {
  const { locations } = useContext(AppContext);
  const router = useRouter();

  return (
    <select
      onChange={({ target }) => {
        router.push({
          pathname: router.pathname,
          query: { location: target.value },
        });
      }}
    >
      {locations.map((location) => (
        <option value={location.url} key={location.url}>
          {location.name}
        </option>
      ))}
    </select>
  );
}
