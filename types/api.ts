import { QueryFunctionContext } from "react-query";

export interface APIResponse<T> {
  body: T;
  page: {
    first: number;
    next: number;
    last: number;
  };
}

export interface Query {
  readonly page?: number;
  readonly number?: number;
}

export type QueryFnContext = QueryFunctionContext<string, number>;
