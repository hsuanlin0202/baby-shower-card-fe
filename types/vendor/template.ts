export interface TemplateTypes {
  id: number;
  name: string;
  partnerName: string;
  partnerLogo: string;
  backgroundImage: string;
  color: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  partner: number;
}

export interface ImageUploadTypes {
  blob: Blob;
  string: string | ArrayBuffer;
}

export interface TemplateFormTypes {
  name: string;
  "text-color": string;
  background: string;
  "partner-logo": string;
  "partner-name": string;
  author: string;
}
