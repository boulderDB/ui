export type Location = {
  id: number;
  name: string;
  url: string;
};

export type TokenPayload = {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
};

export type Gender = {
  id: string;
  name: string;
};

export type UploadRequest = {
  file: string;
};

export type FormErrorResponse = {
  code: 400;
  errors: {
    [key: string]: string[];
  };
  message: string;
  type: "formError";
};

export type ServerErrorResponse = {
  code: 400 | 500;
  message: string;
};

export type ErrorReponse = FormErrorResponse | ServerErrorResponse;
