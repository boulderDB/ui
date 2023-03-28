import { ErrorReponse } from "./types";

export class HTTPError extends Error {
  response: ErrorReponse;

  constructor(response: ErrorReponse) {
    super();
    this.response = response;
  }
}

export async function post<T>(path: string, data: any): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api${path}`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new HTTPError(await response.json());
  }

  return await response.json();
}

export async function get<T>(path: string): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api${path}`
  );

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
