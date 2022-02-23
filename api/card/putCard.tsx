import { putForm } from "api";
import { BABY_API, ErrorResponse } from "../base";

interface PostOrderResponseTypes {
  id: number;
  title: string;
  description: string;
  publicAt: null;
  closeAt: null;
  createdAt: string;
  updatedAt: string;
  commentActive: boolean;
  like: number;
  fatherName: string;
  motherName: string;
  babyName: string;
  babyBirthday: string;
  public: boolean;
  photo: string;
}

/**
 * [PUT cards]
 *
 * edit card detail by id
 */
export function putCard(
  token: string,
  id: string,
  card: FormData
): Promise<{ id: number; message: string }> {
  return putForm<PostOrderResponseTypes & ErrorResponse>(
    BABY_API(`cards/${id}`),
    card,
    {
      Authorization: `Bearer ${token}`,
    },
    100000
  ).then((result) => {
    if (!result) {
      return { id: 0, message: result.error.message };
    }

    return { id: result.id, message: "" };
  });
}
