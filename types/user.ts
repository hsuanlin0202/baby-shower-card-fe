import { VendorInformationTypes } from "types";

export interface LoginTypes {
  identifier: string;
  password: string;
}

export interface UserTypes {
  id: number;
  username: string;
  email: string;
  role?: number;
  partners?: VendorInformationTypes[];
  orders?: string[];
  templates?: string[];
  company?: string;
}
