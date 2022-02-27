export interface VendorInformationTypes {
  id?: number;
  name: string;
  contact: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  openHour: string;
  information: string;
  templates?: VendorTemplateTypes[];
  createAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  tokens?:string[]
}

export interface VendorTemplateTypes {
  id: number;
  name: string;
  textColor: string;
  background: string;
}
