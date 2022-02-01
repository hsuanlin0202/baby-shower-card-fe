import { postForm } from "api";
import { RemoveUndefinedFromObj } from "functions/converters";
import { OrderFormType, UserTypes } from "types";
import { BABY_API, ErrorResponse } from "../base";

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
 * [GET users/me]
 *
 * get user role with token
 */
export function postOrder(
  token: string,
  order: FormData
): Promise<{ id: number; message: string }> {
  return postForm<PostOrderResponseTypes & ErrorResponse>(
    BABY_API("orders"),
    order,
    {
      Authorization: `Bearer ${token}`,
    }
  ).then((result) => {
    if (!result.data) {
      return { id: 0, message: result.error.message };
    }

    return { id: result.data.id, message: "" };
  });
}
