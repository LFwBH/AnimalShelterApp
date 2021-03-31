import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiQuery(query: Query): Query {
  return {
    cursor: query.cursor,
    take: config.defaultPageNumber,
    "filter[name]": "",
  } as const;
}
