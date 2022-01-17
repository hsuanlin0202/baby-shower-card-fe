import { UserTypes } from "types";
import { get, BABY_API, ErrorResponse } from "./base";

interface GetRoleResponse {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: number;
}

function toUser(raw: GetRoleResponse): UserTypes {
  return {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    role: raw.role,
  };
}

/**
 * [GET users/me]
 *
 * get user role with token
 */
export function getUser(token: string): Promise<UserTypes | null> {
  return get<GetRoleResponse & ErrorResponse>(
    BABY_API("users/me"),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toUser(result))
    .catch(() => {
      return null;
    });
}
