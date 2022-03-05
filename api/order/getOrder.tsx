import { DateStringFormat } from "functions";
import { OrderFormType } from "types";
import { get, BABY_API, ErrorResponse } from "../base";

interface OrderResponse {
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
  createdBy: string;
  updatedBy: UpdatedBy;
}

interface Card {
  id: number;
  title: string;
  description: string;
  publicAt: string;
  closeAt: string;
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

interface User {
  id: number;
  email: string;
  name: null;
  createdAt: string;
  updatedAt: string;
}

function toOrder(data: OrderResponse): OrderFormType {
  return {
    // "order-token"?: string;
    "order-no": data.orderNo,
    "order-author": data.author,
    "order-contact": data.contact,
    "order-contact-gender": data.contactGender,
    "order-mobile": data.mobile,
    "order-active": data.active,
    "order-expired-at": DateStringFormat(data.expiredAt),
    "order-created-at": DateStringFormat(data.createdAt),
    // "order-users-email"?: string[];
    "card-title": data.card.title,
    "card-description": data.card.description,
    "card-photo": data.card.photo,
    "card-template": "",
    "card-public-at": DateStringFormat(data.card.publicAt) || "",
    "card-close-at": DateStringFormat(data.card.closeAt) || "",
    "card-comment-active": data.card.commentActive,
    "card-father-name": data.card.fatherName,
    "card-mother-name": data.card.motherName,
    "card-baby-name": data.card.babyName,
    "card-baby-birthday": DateStringFormat(data.card.babyBirthday),
    "card-public": data.card.public,
    "email-1": data.users[0]?.email || "",
    "email-2": data.users[1]?.email || "",
    "order-token": data.token.content,
  };
}

/**
 * [GET order/[id]]
 *
 * get Order detail
 */
export function getOrder(token: string, id: string): Promise<OrderFormType> {
  return get<OrderResponse & ErrorResponse>(
    BABY_API(`orders/${id}?populate=%2A`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toOrder(result))
    .catch(() => {
      return null;
    });
}
