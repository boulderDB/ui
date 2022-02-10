import { mutate } from "swr";

export default function mutateApi(resource, params = null) {
  if (!params) {
    console.debug(resource);
    return mutate(resource);
  }

  console.debug(`${resource}?` + new URLSearchParams(params).toString());
  return mutate(`${resource}?` + new URLSearchParams(params).toString());
}
