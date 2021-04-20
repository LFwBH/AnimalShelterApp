import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiQuery(query: Query): Query {
  return {
    take: config.defaultPageNumber,
    ...query,
  } as const;
}
