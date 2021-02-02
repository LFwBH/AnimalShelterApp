import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiQuery(query: Partial<Query>): Query {
  return {
    page: query.page ?? 1,
    number: config.defaultPageNumber,
  } as const;
}
