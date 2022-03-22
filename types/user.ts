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
  partners?: { id: number; name: string }[];
  blocked: boolean;
  orders?: number[];
  // templates?: string[];
}

export interface EmailTypes {
  email: string;
}