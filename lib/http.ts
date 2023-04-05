import { ErrorReponse } from "./types";

export class HTTPError extends Error {
  response: ErrorReponse;

  constructor(response: ErrorReponse) {
    super();
    this.response = response;
  }
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    const error = new HTTPError(data);

    throw error;
  }

  return data;
};
