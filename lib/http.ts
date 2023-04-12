import { ErrorReponse } from "./types";
import cookies from "js-cookie";

export class HTTPError extends Error {
  response: ErrorReponse;

  constructor(response: ErrorReponse) {
    super();
    this.response = response;
  }
}

export const fetcher = async (url: string) => {
  if (cookies.get("authenticated") !== "true") {
    throw new HTTPError({
      code: 401,
      message: "Unauthorized",
    });
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    const error = new HTTPError(data);

    throw error;
  }

  return data;
};
