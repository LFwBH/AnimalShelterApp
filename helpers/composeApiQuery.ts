import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiQuery(query: Query): Query {
  return {
    page: query.page,
    number: config.defaultPageNumber,
  } as const;
}
