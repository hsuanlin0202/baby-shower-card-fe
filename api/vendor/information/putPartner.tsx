import { VendorInformationTypes } from 'types';
import { put, BABY_API, ErrorResponse } from '../../base';

interface PartnerResponse {
  data: {
    name: string;
    contact: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    openHour: string;
    information: string;
  };
}

function toPartner(data: PartnerResponse): VendorInformationTypes {
  return {
    name: data.data.name,
    contact: data.data.contact,
    contactPhone: data.data.contactPhone,
    contactEmail: data.data.contactEmail,
    contactAddress: data.data.contactAddress,
    openHour: data.data.openHour,
    information: data.data.information,
  };
}

/**
 * [PUT partner/{id}]
 *
 * put partner
 */
export function putPartner(data: VendorInformationTypes, id: string, token: string) {
  return put<PartnerResponse & ErrorResponse>(
    BABY_API(`partners/${id}`),
    { data: data },
    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => result.data)
    .catch(() => {
      return '';
    });
}
