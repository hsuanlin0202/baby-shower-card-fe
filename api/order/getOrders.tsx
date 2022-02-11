import { DateStringFormat } from "functions";
import { OrderListTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../base";

function toOrder(data: OrderData): OrderListTypes {
  return {
    orderId: data.id,
    orderNo: data.attributes.orderNo,
    contact: data.attributes.contact,
    mobile: data.attributes.mobile,
    active: data.attributes.active,
    createdAt: DateStringFormat(data.attributes.createdAt),
  };
}

interface OrderData {
  id: number;
  attributes: OrderAttributes;
}

interface OrderAttributes {
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
  users: Users;
}

interface Card {
  data: Data | null;
}

interface Data {
  id: number;
  attributes: DataAttributes;
}

interface DataAttributes {
  title: string;
  description: null | string;
  publicAt: null;
  closeAt: null;
  createdAt: string;
  updatedAt: string;
  commentActive: boolean;
  like: number;
  fatherName: string;
  motherName: string;
  babyName: string;
  babyBirthday: Date | null;
  public: boolean;
  photo: string;
}

interface Users {
  data: UsersDatum[];
}

interface UsersDatum {
  id: number;
  attributes: UserAttributes;
}

interface UserAttributes {
  email: string;
  name: null;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface GetOrdersResponse {
  data: OrderData[];
  meta: Meta;
}

/**
 * [GET orders]
 *
 * get orders by auth
 */
export function getOrders(token: string): Promise<OrderListTypes[]> {
  return get<GetOrdersResponse>(
    BABY_API(`orders?populate=*`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => {
      const temp = result.data.map((item) => toOrder(item));
      const sort = temp.sort((a, b) => {
        return a.orderId - b.orderId;
      });
      return sort;
    })
    .catch(() => {
      return null;
    });
}
