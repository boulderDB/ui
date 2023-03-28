import { cookies } from "next/headers";
import decode from "jwt-decode";
import { TokenPayload } from "./types";

export function isAuthenticated(): boolean {
  const payload = getTokenPayload();

  if (!payload) {
    return false;
  }

  return new Date().getTime() / 1000 <= payload.exp;
}

export function getTokenPayload(): TokenPayload | null {
  const cookie = cookies().get("BEARER");

  if (!cookie) {
    return null;
  }

  return decode(cookie?.value);
}
