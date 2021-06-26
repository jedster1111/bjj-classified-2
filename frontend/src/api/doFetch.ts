import ky, { HTTPError } from "ky";

export type NetworkError = {
  type: "networkFailure";
  message: string;
};

export type RequestError = {
  type: "requestError";
  message: string;
  status: number;
};

export type RequestSuccess<Data> = {
  type: "requestSuccess";
  data?: Data;
};

export type RequestResponses<Response> =
  | NetworkError
  | RequestError
  | RequestSuccess<Response>;

export const doFetch = async <Data>(
  url: string
): Promise<RequestResponses<Data>> => {
  try {
    const response = await ky.get(url);
    return {
      type: "requestSuccess",
      data: await response.json(),
    };
  } catch (e) {
    if (e instanceof HTTPError) {
      return {
        type: "requestError",
        status: e.response.status,
        message: await e.response.text(),
      };
    } else {
      return {
        type: "networkFailure",
        message: e.message,
      };
    }
  }
};
