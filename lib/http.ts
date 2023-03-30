import { ErrorReponse } from "./types";

export class HTTPError extends Error {
  response: ErrorReponse;

  constructor(response: ErrorReponse) {
    super();
    this.response = response;
  }
}

export async function api<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    credentials: "include",
    mode: "cors",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api${path}`,
    options
  );

  if (!response.ok) {
    throw new HTTPError(await response.json());
  }

  return await response.json();
}