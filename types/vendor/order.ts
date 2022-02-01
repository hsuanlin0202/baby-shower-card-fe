import { ReactNode } from 'react';

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
  active: number;
  createdAt: Date;
}

export interface VendorTypes {
  name: string;
  contact: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  openHour: string;
  information: string;
}

export interface InputLayoutProps {
  label: string;
  children: ReactNode;
}
