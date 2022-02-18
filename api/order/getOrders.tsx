import { DateStringFormat } from "functions";
import { OrderListTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../base";

function toOrder(data: OrderData): OrderListTypes {
  return {
    id: data.id,
    orderNo: data.orderNo,
    contact: data.contact,
    mobile: data.mobile,
    active: data.active,
    createdAt: DateStringFormat(data.createdAt),
  };
}

function sortOrder(data: OrderData[]): OrderListTypes[] {
  const temp = data.map((item) => toOrder(item));
  const sort = temp.sort((a, b) => {
    return a.id - b.id;
  });
  return sort;
}

interface OrderData {
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
  card: Card;
  token: Token;
  users: User[];
  createdBy: null;
  updatedBy: UpdatedBy | null;
}

interface Card {
  id: number;
  title: string;
  description: string;
  publicAt: null;
  closeAt: null;
  createdAt: string;
  updatedAt: string;
  commentActive: boolean;
  like: number;
  fatherName: string;
  motherName: string;
  babyName: string;
  babyBirthday: string;
  public: boolean;
  photo: string;
}

interface Token {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface UpdatedBy {
  id: number;
  firstname: string;
  lastname: string;
  username: null;
  email: string;
  password: string;
  resetPasswordToken: null;
  registrationToken: null;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  email: string;
  name: null;
  createdAt: string;
  updatedAt: string;
}

/**
 * [GET orders]
 *
 * get orders by auth
 */
export function getOrders(token: string): Promise<OrderListTypes[]> {
  return get<OrderData[]>(
    BABY_API(`orders?populate=*`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => sortOrder(result))
    .catch(() => {
      return null;
    });
}
