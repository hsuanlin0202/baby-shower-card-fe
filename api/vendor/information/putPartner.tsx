import { VendorInformationTypes } from "types";
import { put, BABY_API, ErrorResponse } from "../../base";

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

/**
 * [PUT partner/{id}]
 *
 * put partner
 */
export function putPartner(
  data: VendorInformationTypes,
  id: string,
  token: string
) {
  return put<PartnerResponse & ErrorResponse>(
    BABY_API(`partners/${id}`),
    { data: data },
    {
      Authorization: `Bearer ${token}`,
    }
  )
    .then((result) => result.data)
    .catch(() => {
      return "";
    });
}
