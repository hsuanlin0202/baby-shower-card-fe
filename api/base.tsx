import { join } from "path";
import getConfig from "next/config";

const DefaultTimeout = 5000;

export interface ErrorResponse {
  error?: {
    status: number;
    name: string;
    message: string;
  };
}

type Query = Record<string, string | number | boolean | undefined>;
export function BABY_API(path: string, query?: Query) {
  const { publicRuntimeConfig } = getConfig();

  const url = new URL("./" + join(path), publicRuntimeConfig.STRAPI_API);

  query &&
    Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  return new Request(url.toString());
}

function status(response: Response) {
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  return Promise.resolve(response);
}

function json(response: Response) {
  return response.json().then((body) => {
    if (body.code === 500) {
      throw new Error(body.message);
    }

    return Promise.resolve(body);
  });
}

function error(err: Error) {
  console.error(err);

  throw err;
}

export function get<T>(
  req: RequestInfo,
  headers = {},
  timeout?: number
): Promise<T> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout || DefaultTimeout);
  return fetch(
    new Request(req, {
      signal: controller.signal,
      headers: new Headers(headers),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}

export function put<T>(
  req: RequestInfo,
  body: object,
  headers = {},
  timeout?: number
): Promise<T> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout || DefaultTimeout);

  return fetch(
    new Request(req, {
      signal: controller.signal,
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
        ...headers,
      }),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}

export function putForm<T>(
  req: RequestInfo,
  body: FormData,
  headers = {},
  timeout?: number
): Promise<T> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout || DefaultTimeout);
  return fetch(
    new Request(req, {
      signal: controller.signal,
      method: "PUT",
      body: body,
      headers: new Headers({
        accept: "application/json",
        ...headers,
      }),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}

export function post<T>(
  req: RequestInfo,
  body: object,
  headers = {},
  timeout?: number
): Promise<T> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout || DefaultTimeout);
  return fetch(
    new Request(req, {
      signal: controller.signal,
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
        ...headers,
      }),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}

export function postForm<T>(
  req: RequestInfo,
  body: FormData,
  headers = {},
  timeout?: number
): Promise<T> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout || DefaultTimeout);
  return fetch(
    new Request(req, {
      signal: controller.signal,
      method: "POST",
      body: body,
      headers: new Headers({
        accept: "application/json",
        ...headers,
      }),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}
