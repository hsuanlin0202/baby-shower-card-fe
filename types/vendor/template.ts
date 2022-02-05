export interface TemplateTypes {
  id: number;
  name: string;
  partnerName: string;
  logoImage: string;
  backgroundImage: string;
  color: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImageUploadTypes {
  blob: Blob;
  string: string | ArrayBuffer;
}
