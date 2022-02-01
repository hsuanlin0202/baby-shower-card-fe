import { postForm } from "api";
import { RemoveUndefinedFromObj } from "functions/converters";
import { OrderFormType, UserTypes } from "types";
import { BABY_API, ErrorResponse } from "../base";

/**
 * [GET users/me]
 *
 * get user role with token
 */
export function postOrder(token: string, order: FormData): Promise<void> {
  return postForm<any>(BABY_API("orders"), order, {
    Authorization: `Bearer ${token}`,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
