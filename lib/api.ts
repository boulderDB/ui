import { cookies } from "next/headers";
import decode from "jwt-decode";
import { TokenPayload } from "./types";

export function isAuthenticated(): boolean {
  return cookies().get("authenticated") !== undefined;
}

export function getTokenPayload(): TokenPayload | null {
  const cookie = cookies().get("BEARER");

  if (!cookie) {
    return null;
  }

  return decode(cookie?.value);
}
