import { ErrorReponse } from "./types";
export class HTTPError extends Error {
  response: ErrorReponse;

  constructor(response: ErrorReponse) {
    super();
    this.response = response;
  }
}

export const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.status === 204) {
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      const error = new HTTPError(data);

      throw error;
    }

    return data;
  } catch (error) {
    console.error(url);
    console.error(error);
  }
};
