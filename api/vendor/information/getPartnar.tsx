import { RemoveUndefinedFromObj } from "functions/converters";
import { UserTypes, VendorInformationTypes, VendorTemplateTypes } from "types";
import { get, BABY_API, ErrorResponse } from "../../base";

interface PartnerResponse {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    contact: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    openHour: string;
    information: string;
    templates: {
      data: PartnerTemplatesResponse[];
    };
  };
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

function toTemplate(list: PartnerTemplatesResponse): VendorTemplateTypes {
  return {
    id: list.id,
    name: list.attributes.name,
    textColor: list.attributes.textColor,
    background: list.attributes.background,
  };
}

function toPartner(data: PartnerResponse): VendorInformationTypes {
  return {
    id: data.id,
    name: data.attributes.name,
    contact: data.attributes.contact,
    contactPhone: data.attributes.contactPhone,
    contactEmail: data.attributes.contactEmail,
    contactAddress: data.attributes.contactAddress,
    openHour: data.attributes.openHour,
    information: data.attributes.information,
    templates: !data.attributes.templates
      ? []
      : data.attributes.templates.data.map((template) => toTemplate(template)),
  };
}

interface GetPartnerResponse {
  data: PartnerResponse;
  meta: {};
}

/**
 * [GET partners/[id]]
 *
 * get Partner information
 */
export function getPartner(
  token: string,
  id: string,
  populate?: string[]
): Promise<VendorInformationTypes> {
  const populateList = populate.map((item) => {
    return `populate=${item}`;
  });
  const populateString = populateList.join().replaceAll(",", "&");
  return get<GetPartnerResponse>(
    BABY_API(`partners/${id}${populateString ? `?${populateString}` : ``}`),

    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => toPartner(result.data))
    .catch(() => {
      return null;
    });
}
