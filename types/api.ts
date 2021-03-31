import { QueryFunctionContext } from "react-query";

export interface APIResponse<T> {
  code: number;
  message: string;
  timestamp: number;
  data: T;
}

export interface Query {
  readonly cursor?: number;
  readonly take?: number;
  readonly "filter[name]"?: string;
}

export type QueryFnContext = QueryFunctionContext<string, number>;
