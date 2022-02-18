import { TemplateTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../../base";

function toTemplate(data: TemplatesData): TemplateTypes {
  return {
    id: data.id,
    name: data.attributes.name,
    partnerName: data.attributes.partnerName,
    partnerLogo: data.attributes.partnerLogo,
    backgroundImage: data.attributes.background,
    color: data.attributes.textColor,
    active: true,
    // createdAt: data.attributes.createdAt
    // updatedAt: string;
    partner: data.attributes.partners.data[0].id,
  };
}

interface TemplatesData {
  id: number;
  attributes: TemplatesAttributes;
}

interface TemplatesAttributes {
  name: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background: string;
  partnerLogo: string;
  partnerName: string;
  partners: Partners;
}

interface Partners {
  data: PartnersData[];
}

interface PartnersData {
  id: number;
  attributes: PartnersAttributes;
}

interface PartnersAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  contact: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  openHour: string;
  information: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface GetOrdersResponse {
  data: TemplatesData[];
  meta: Meta;
}

/**
 * [GET orders]
 *
 * get templates
 */
export function getTemplates(partner: string): Promise<TemplateTypes[]> {
  return get<GetOrdersResponse>(BABY_API(`templates?populate=*`))
    .then((result) => {
      const temp = result.data.map((item) => toTemplate(item));
      const findPartner = temp.filter(
        (item) => item.partner.toString() === partner.toString()
      );
      return findPartner;
    })
    .catch(() => {
      return null;
    });
}
