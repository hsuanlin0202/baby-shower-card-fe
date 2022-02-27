import { DateStringFormat } from "functions";
import { BabyCardTypes } from "types";
import { get, BABY_API } from "../base";

interface CardResponse {
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
  messages: any[];
  order: Order;
  template: Template;
  createdBy: null;
  updatedBy: UpdatedBy;
}

interface Order {
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
  active: null;
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

function toCard(data: CardResponse): BabyCardTypes {
  return {
    id: data.id,
    description: data.description,
    commentActive: data.commentActive,
    like: data.like,
    fatherName: data.fatherName,
    motherName: data.motherName,
    babyName: data.babyName,
    babyBirthday: DateStringFormat(data.babyBirthday),
    public: data.public,
    photo: data.photo,
    template: {
      textColor: data.template.textColor,
      background: data.template.background,
      logo: data.template.partnerLogo,
      partner: data.template.partnerName,
    },
    active: data.order.active, // from order
    expiredAt: DateStringFormat(data.order.expiredAt),
  };
}

/**
 * [GET cards/[id]]
 *
 * get Card detail by id for Front Stage
 */
export function getCard(id: string): Promise<BabyCardTypes> {
  return get<CardResponse>(BABY_API(`cards/${id}?populate=%2A`))
    .then((result) => toCard(result))
    .catch(() => {
      return null;
    });
}
