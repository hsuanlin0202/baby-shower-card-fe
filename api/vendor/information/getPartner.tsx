import { RemoveUndefinedFromObj } from "functions/converters";
import { UserTypes, VendorInformationTypes, VendorTemplateTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../../base";


export interface DatedBy {
  id:                 number;
  firstname:          string;
  lastname:           string;
  username:           string;
  email:              string;
  password:           string;
  resetPasswordToken: string;
  registrationToken:  string;
  isActive:           boolean;
  blocked:            boolean;
  preferedLanguage:   string;
  createdAt:          string;
  updatedAt:          string;
}

export interface Employee {
  id:                 number;
  username:           string;
  email:              string;
  provider:           string;
  password:           string;
  resetPasswordToken: string;
  confirmationToken:  string;
  confirmed:          boolean;
  blocked:            boolean;
  createdAt:          string;
  updatedAt:          string;
}

export interface Template {
  id:          number;
  name:        string;
  textColor:   string;
  createdAt:   string;
  updatedAt:   string;
  publishedAt: string;
  background:  string;
  partnerLogo: string;
  partnerName: string;
  active:      boolean;
}

export interface Token {
  id:          number;
  content:     string;
  createdAt:   string;
  updatedAt:   string;
  publishedAt: string;
}

interface PartnerResponse {
  id:             number;
  name:           string;
  createdAt:      string;
  updatedAt:      string;
  publishedAt:    string;
  contact:        string;
  contactPhone:   string;
  contactEmail:   string;
  contactAddress: string;
  openHour:       string;
  information:    string;
  tokens:         Token[];
  users:          Employee[];
  templates:      Template[];
  employees:      Employee[];
  createdBy:      DatedBy;
  updatedBy:      DatedBy;
}

interface PartnerTemplatesResponse {
  id: number;
  attributes: {
    name: string;
    textColor: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    background: string;
  };
}

function toTemplate(template: Template): VendorTemplateTypes {
  return {
    id: template.id,
    name: template.name,
    textColor: template.textColor,
    background: template.background,
  };
}

function toTokens(token: Token): string {
  return token.content;
}

function toPartner(data: PartnerResponse): VendorInformationTypes {
  return {
    id: data.id,
    name: data.name,
    contact: data.contact,
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    contactAddress: data.contactAddress,
    openHour: data.openHour,
    information: data.information,
    tokens:!data.tokens?[]:data.tokens.map((token)=>toTokens(token)),
    templates: !data.templates
      ? []
      : data.templates.map((template) => toTemplate(template)),
  };
}

/**
 * [GET partners/[id]]
 *
 * get Partner information
 */
export function getPartner(
  token: string,
  id: number,
  populate?: string[]
): Promise<VendorInformationTypes> {
  const populateList = populate.map((item) => {
    return `populate=${item}`;
  });
  const populateString = populateList.join().replaceAll(",", "&");
  return get<PartnerResponse>(
    BABY_API(`partners/${id}${populateString ? `?${populateString}` : ``}`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toPartner(result))
    .catch(() => {
      return null;
    });
}
