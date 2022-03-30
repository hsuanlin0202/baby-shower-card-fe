import { putForm } from "api";
import { BABY_API, ErrorResponse } from "../../base";

interface PutOrderResponseTypes {
  id: number;
  name: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background: string;
  partnerLogo: string;
  partnerName: string;
  active: boolean;
}

/**
 * [PUT templates/[id]]
 *
 * edit templates detail by id
 */
export function putTemplates(
  token: string,
  id: string,
  order: FormData
): Promise<{ id: number; message: string }> {
  return putForm<PutOrderResponseTypes & ErrorResponse>(
    BABY_API(`templates/${id}`),
    order,
    {
      Authorization: `Bearer ${token}`,
    },
    15000
  ).then((result) => {
    if (!result.id) {
      return { id: 0, message: result.error.message };
    }

    return { id: result.id, message: "" };
  });
}
