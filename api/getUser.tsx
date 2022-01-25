import { RemoveUndefinedFromObj } from "functions/converters";
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
  role?: number;
  partners?: string[];
  orders?: string[];
  templates?: string[];
  company?: string;
}

function toUser(raw: GetRoleResponse): UserTypes {
  const rawData = {
    role: raw.role || undefined,
    partners: raw.partners || undefined,
    orders: raw.orders || undefined,
    templates: raw.templates || undefined,
    company: raw.company || undefined,
  };

  return {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    ...RemoveUndefinedFromObj(rawData),
  };
}

interface getUserQuery {}

/**
 * [GET users/me]
 *
 * get user role with token
 */
export function getUser(
  token: string,
  populate: "role" | "partners" | "orders" | "templates" | "company"
): Promise<UserTypes | null> {
  return get<GetRoleResponse & ErrorResponse>(
    BABY_API("users/me", { populate: populate }),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toUser(result))
    .catch(() => {
      return null;
    });
}
