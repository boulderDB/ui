export type Location = {
  id: number;
  name: string;
  url: string;
};

export type Notification = {
  id: number;
  type: "doubt";
  location: Location;
};

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  id: number;
  image: string;
  lastActivity: string;
  notifications: Notification[];
  roles: string[];
  username: string;
  visible: boolean;
};

export type TokenPayload = {
  exp: number;
  roles: string[];
  username: string;
};

export type LoginResponse = {
  expiration: number;
  lastVisitedLocation: Location;
  target: string | null;
  user: User;
};

export type AccountResponse ={
  
}

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
