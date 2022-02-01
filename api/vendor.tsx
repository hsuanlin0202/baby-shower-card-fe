import { VendorTypes } from 'types';
import { put, BABY_API, ErrorResponse } from './base';

interface VendorResponse {
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

function toData(data: VendorResponse): VendorTypes {
  return data.data;
}

/**
 * [PUT partner/{id}]
 *
 * put partner
 */
export function putPartner(data: VendorTypes, id: number) {
  return put<VendorResponse & ErrorResponse>(BABY_API(`partners/${id}`), data)
    .then((result) => toData(result))
    .catch(() => {
      return '';
    });
}
