import { putForm } from "api";
import { BABY_API, ErrorResponse } from "../../base";

interface PostOrderResponseTypes {
  data: {
    id: number;
    attributes: {
      author: string;
      orderNo: string;
      contact: string;
      contactGender: string;
      mobile: string;
      active: boolean;
      expiredAt: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta?: {};
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
  return putForm<PostOrderResponseTypes & ErrorResponse>(
    BABY_API(`templates/${id}`),
    order,
    {
      Authorization: `Bearer ${token}`,
    },
    15000
  ).then((result) => {
    if (!result.data) {
      return { id: 0, message: result.error.message };
    }

    return { id: result.data.id, message: "" };
  });
}
