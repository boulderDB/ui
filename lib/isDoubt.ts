import { Ascent } from "./types";

export function isDoubt(type: Ascent["type"] | null | undefined): boolean {
  if (!type) {
    return false;
  }

  return type.includes("-pending-doubt");
}
