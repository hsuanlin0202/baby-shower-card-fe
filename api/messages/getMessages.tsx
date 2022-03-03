import { MessageTypes } from "types";
import { get, BABY_API } from "../base";

function toMessages(data: Data): MessageTypes {
  return {
    id: data.id,
    cardId: data.attributes.card.data.id,
    author: data.attributes.author.data.attributes.name,
    content: data.attributes.content,
    public: data.attributes.public,
    createdAt: data.attributes.createdAt,
  };
}

interface Data {
  id: number;
  attributes: DataAttributes;
}

interface DataAttributes {
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  public: boolean;
  card: Card;
  author: Author;
}

interface Author {
  data: AuthorData;
}

interface AuthorData {
  id: number;
  attributes: AuthorAttributes;
}

interface AuthorAttributes {
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Card {
  data: CardData;
}

interface CardData {
  id: number;
  attributes: CardAttributes;
}

interface CardAttributes {
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

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface GetMessagesResponse {
  data: Data[];
  meta: Meta;
}

/**
 * [GET messages]
 *
 * get messages
 */
export function getMessages(cardId: number): Promise<MessageTypes[]> {
  return get<GetMessagesResponse>(BABY_API(`messages?populate=*`))
    .then((result) => {
      const filtered = result.data.filter(
        (message) => message.attributes.card.data.id === cardId
      );
      return filtered.map((item) => toMessages(item));
    })
    .catch(() => {
      return null;
    });
}
