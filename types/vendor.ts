import { ReactNode } from 'react';
export interface VendorTypes {
  vendor: string;
  gender: string;
  contact: string;
  tel: string;
  email: string;
  country: string;
  district: string;
  address: string;
  time: string;
  description: string;
}

export interface InputLayoutProps {
  label: string;
  children: ReactNode;
}
