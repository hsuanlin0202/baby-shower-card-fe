import { DateStringFormat } from "functions";
import { OrderFormType } from "types";
import { get, BABY_API, ErrorResponse } from "../base";

interface OrderResponse {
  id: number;
  attributes: {
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
    card: {
      data: CardResponse;
    };
    users: {
      data: UserTypes[];
    };
  };
}

interface CardResponse {
  id: number;
  attributes: {
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
  };
}

interface UserTypes {
  id: number;
  attributes: {
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

function toOrder(data: OrderResponse): OrderFormType {
  return {
    // "order-token"?: string;
    "order-no": data.attributes.orderNo,
    "order-author": data.attributes.author,
    "order-contact": data.attributes.contact,
    "order-contact-gender": data.attributes.contactGender,
    "order-mobile": data.attributes.mobile,
    "order-active": data.attributes.active,
    "order-expired-at": DateStringFormat(data.attributes.expiredAt),
    "order-created-at": DateStringFormat(data.attributes.createdAt),
    // "order-users-email"?: string[];
    "card-title": data.attributes.card.data.attributes.title,
    "card-description": data.attributes.card.data.attributes.description,
    "card-photo": data.attributes.card.data.attributes.photo,
    "card-template": "",
    "card-public-at":
      DateStringFormat(data.attributes.card.data.attributes.publicAt) || "",
    "card-close-at":
      DateStringFormat(data.attributes.card.data.attributes.closeAt) || "",
    "card-comment-active": data.attributes.card.data.attributes.commentActive,
    "card-father-name": data.attributes.card.data.attributes.fatherName,
    "card-mother-name": data.attributes.card.data.attributes.motherName,
    "card-baby-name": data.attributes.card.data.attributes.babyName,
    "card-baby-birthday": DateStringFormat(
      data.attributes.card.data.attributes.babyBirthday
    ),
    "card-public": data.attributes.card.data.attributes.public,
    "email-1": data.attributes?.users?.data[0]?.attributes?.email || "",
    "email-2": data.attributes?.users?.data[1]?.attributes?.email || "",
  };
}

interface GetOrderResponse {
  data: OrderResponse;
  meta: {};
}

/**
 * [GET order/[id]]
 *
 * get Order detail
 */
export function getOrder(token: string, id: string): Promise<OrderFormType> {
  return get<GetOrderResponse & ErrorResponse>(
    BABY_API(`orders/${id}?populate=%2A`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toOrder(result.data))
    .catch(() => {
      return null;
    });
}
