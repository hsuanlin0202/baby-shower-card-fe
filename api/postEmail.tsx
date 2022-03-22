import { EmailTypes } from "../types";
import { post, BABY_API, ErrorResponse } from "./base";

interface EmailResponse {
  ok: boolean;
}

// function toReslut(data: ResultTypes): boolean {
//   return data.ok;
// }

/**
 * [POST auth/forgot-password]
 * post Email
 */

export function postEmail(
  data: EmailTypes,
  timeout?: number
): Promise<{ ok: boolean; message: string }> {
  return post<EmailResponse & ErrorResponse>(
    BABY_API("auth/forgot-password"),
    data,
    {},
    timeout
  ).then((result) => {
    if (!result) {
      return { ok: false, message: result.error.message };
    }
    return { ok: result.ok, message: "" };
  });
}
