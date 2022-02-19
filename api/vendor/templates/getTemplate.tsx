import { TemplateTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../../base";

function toTemplate(data: TemplateData): TemplateTypes {
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

interface TemplateData {
  id: number;
  attributes: TemplateAttributes;
}

interface TemplateAttributes {
  name: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background: string;
  partnerLogo: string;
  partnerName: string;
  partners: Partner;
}

interface Partner {
  data: PartnerData[];
}

interface PartnerData {
  id: number;
  attributes: PartnerAttributes;
}

interface PartnerAttributes {
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
  data: TemplateData;
  meta: Meta;
}

/**
 * [GET orders]
 *
 * get templates
 */
export function getTemplate(id: string): Promise<TemplateTypes> {
  return get<GetOrdersResponse>(
    BABY_API(`templates/${id}?populate=*`)

    // {
    //   Authorization: `Bearer ${token}`,
    // }
  )
    .then((result) => {
      return toTemplate(result.data);
    })
    .catch(() => {
      return null;
    });
}
