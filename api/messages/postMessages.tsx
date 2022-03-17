import { postForm } from "api";
import { BABY_API, ErrorResponse } from "../base";

interface PostAnonymoususersResponseTypes {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface PostMessagesResponseTypes {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: null;
  public: boolean;
}

interface PostQuery {
  author: string;
  content: string;
  cardId: number;
}

/**
 * [POST Messages]
 *
 * post a new message with [POST] anonymoususers and then [POST] messages
 */
export function postMessages(query: PostQuery): Promise<boolean> {
  const formData = new FormData();

  formData.append("name", query.author);

  return postForm<PostAnonymoususersResponseTypes & ErrorResponse>(
    BABY_API("anonymoususers"),
    formData
  ).then((result) => {
    if (!result.id) {
      return false;
    }

    return postMessageSec(query, result.id);
  });
}

function postMessageSec(query: PostQuery, authorId: number): Promise<boolean> {
  return postForm<PostMessagesResponseTypes & ErrorResponse>(
    BABY_API("messages"),
    organizedForm(query, authorId)
  ).then((result) => {
    if (!result) {
      return false;
    }

    return true;
  });
}

function organizedForm(query: PostQuery, authorId: number) {
  const formData = new FormData();

  const organizedData = {
    author: authorId,
    content: query.content,
    card: query.cardId,
    public: true,
  };
  for (const name in organizedData) {
    formData.append(name, organizedData[name]);
  }

  return formData;
}
