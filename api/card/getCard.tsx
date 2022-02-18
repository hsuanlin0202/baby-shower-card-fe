import { DateStringFormat } from "functions";
import { BabyCardTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../base";

interface CardResponse {
  id: number;
  attributes: CardAttributes;
}

interface CardAttributes {
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
  messages: Messages;
  order: Order;
  template: Template;
}

interface Messages {
  data: string[]; // 待定
}

interface Order {
  data: OrderData;
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
}

interface Template {
  data: TemplateData;
}

interface TemplateData {
  id: number;
  attributes: TemplateAttributes;
}

interface TemplateAttributes {
  name: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background: string;
  partnerLogo: string;
  partnerName: string;
}

function toCard(data: CardResponse): BabyCardTypes {
  return {
    id: data.id,
    description: data.attributes.description,
    commentActive: data.attributes.commentActive,
    like: data.attributes.like,
    fatherName: data.attributes.fatherName,
    motherName: data.attributes.motherName,
    babyName: data.attributes.babyName,
    babyBirthday: DateStringFormat(data.attributes.babyBirthday),
    public: data.attributes.public,
    photo: data.attributes.photo,
    template: {
      textColor: data.attributes.template.data.attributes.textColor,
      background: data.attributes.template.data.attributes.background,
      logo: data.attributes.template.data.attributes.partnerLogo,
      partner: data.attributes.template.data.attributes.partnerName,
    },
    active: data.attributes.order.data.attributes.active, // from order
    expiredAt: DateStringFormat(
      data.attributes.order.data.attributes.expiredAt
    ),
  };
}

interface GetCardResponse {
  data: CardResponse;
  meta: {};
}

/**
 * [GET cards/[id]]
 *
 * get Card detail by id for Front Stage
 */
export function getCard(id: string): Promise<BabyCardTypes> {
  return get<GetCardResponse & ErrorResponse>(
    BABY_API(`cards/${id}?populate=%2A`)
  )
    .then((result) => toCard(result.data))
    .catch(() => {
      return null;
    });
}
