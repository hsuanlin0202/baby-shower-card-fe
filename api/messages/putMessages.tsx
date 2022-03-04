import { putForm } from "api";
import { BABY_API, ErrorResponse } from "../base";

interface PutMessagesResponseTypes {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  public: boolean;
}

/**
 * [PUT messages]
 *
 * edit messages public status
 */
export function putMessages(
  token: string,
  id: number,
  status: boolean
): Promise<boolean> {
  const formData = new FormData();

  formData.append("public", status.toString());

  return putForm<PutMessagesResponseTypes & ErrorResponse>(
    BABY_API(`messages/${id}`),
    formData,
    {
      Authorization: `Bearer ${token}`,
    },
    100000
  ).then((result) => {
    if (!result.id) {
      return false;
    }

    return true;
  });
}
