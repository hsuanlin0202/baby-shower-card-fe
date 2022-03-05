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
  createdAt: string;
  updatedAt: string;
  role: Role;
  partners: Partner[];
  orders: Order[];
  templates: Template[];
  company: string;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
}

interface CreatedBy {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  registrationToken: string;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  author: string;
  orderNo: string;
  contact: string;
  contactGender: string;
  mobile: string;
  active: boolean;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Partner {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  contact: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  openHour: string;
  information: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: number;
  name: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background: string;
  partnerLogo: string;
  partnerName: string;
}

function toPartners(data: Partner) {
  return { id: data.id, name: data.name };
}

function toOrders(data: Order) {
  return data.id;
}

function toUser(raw: GetRoleResponse): UserTypes {
  if (!raw.id || !raw.username || !raw.email) return null;

  const rawData = {
    partners: raw.partners.map((item) => toPartners(item)) || [],
    orders: raw.orders.map((item) => toOrders(item)) || [],
    // templates: raw.templates || undefined,
  };

  return {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    blocked: raw.blocked,
    role: raw.role.id,
    partners: raw.partners.map((item) => toPartners(item)) || [],
    orders: raw.orders.map((item) => toOrders(item)) || [],
    // ...RemoveUndefinedFromObj(rawData),
  };
}

/**
 * [GET users/me]
 *
 * get user role with token
 */
export function getUser(
  token: string,
  populate: string[],
  timeout?: number
): Promise<UserTypes | null> {
  const populateList = populate.map((item) => {
    return `populate=${item}`;
  });
  const populateString = populateList.join().replaceAll(",", "&");
  return get<GetRoleResponse & ErrorResponse>(
    BABY_API(populateString ? `users/me?${populateString}` : `users/me`),
    {
      Authorization: `Bearer ${token}`,
    },
    timeout
  )
    .then((result) => toUser(result))
    .catch(() => {
      return null;
    });
}
