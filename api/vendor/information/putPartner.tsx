import { VendorInformationTypes } from 'types';
import { put, BABY_API, ErrorResponse } from '../../base';

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
  };
}

/**
 * [PUT partner/{id}]
 *
 * put partner
 */
export function putPartner(data: VendorInformationTypes, id: number, token: string) {
  return put<PartnerResponse & ErrorResponse>(BABY_API(`partners/${id}`), data, {
    Authorization: `Bearer ${token}`,
  })
    .then((result) => toPartner(result))
    .catch(() => {
      return '';
    });
}
