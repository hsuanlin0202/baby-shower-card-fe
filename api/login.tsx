import { LoginTypes } from "types";
import { post, BABY_API, ErrorResponse } from "./base";

interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

function toToken(data: LoginResponse): string {
  return data.jwt;
}

/**
 * [POST auth/local]
 *
 * post Login
 */
export function postLogin(data: LoginTypes, timeout?: number): Promise<string> {
  return post<LoginResponse & ErrorResponse>(
    BABY_API("auth/local"),
    data,
    {},
    timeout
  )
    .then((result) => toToken(result))
    .catch(() => {
      return "";
    });
}
