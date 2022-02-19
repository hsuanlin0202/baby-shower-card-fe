import { ReactNode } from "react";

export interface OrderFormType {
  "order-token"?: string;
  "order-no": string;
  "order-author": string;
  "order-contact": string;
  "order-contact-gender": string;
  "order-mobile": string;
  "order-active": boolean;
  "order-expired-at": string;
  "order-created-at"?: string;
  "order-users-email"?: string[];
  "card-title": string;
  "card-description": string;
  "card-photo": string;
  "card-template": string;
  "card-public-at"?: string;
  "card-close-at"?: string;
  "card-comment-active": boolean;
  "card-father-name": string;
  "card-mother-name": string;
  "card-baby-name": string;
  "card-baby-birthday": string;
  "card-public": boolean;
  "email-1"?: string;
  "email-2"?: string;
}

export interface OrderTypes {
  createdAt: string;
  updatedAt: string;
  author: string;
  orderNo: string;
  contact: string;
  contactGender: string;
  mobile: string;
  active: boolean;
  expiredAt: string;
}

export interface CardTypes {
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  publicAt?: string;
  closeAt?: string;
  commentActive?: boolean;
  like?: number;
  fatherName?: string;
  motherName?: string;
  babyName: string;
  babyBirthday: string;
  photo: string;
  template: number;
  parentEmail1: string;
  parentEmail2: string;
}

export interface OrderListTypes {
  index?: number;
  edit?: string;
  orderNo: string;
  contact: string;
  mobile: string;
  active: boolean;
  createdAt: string;
  id: number;
}

export interface InputLayoutProps {
  label: string;
  children: ReactNode;
}
