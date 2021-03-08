import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiUrl<T extends string>(
  segment: T,
): `${typeof config.apiUrl}/${T}`;

export default function composeApiUrl<T extends string, Q extends Query>(
  segment: T,
  query: Q,
): `${typeof config.apiUrl}/${T}?take=${Q["take"]}&cursor=${Q["cursor"]}`;

export default function composeApiUrl<
  T extends string,
  Q extends Query | undefined
>(segment: T, query?: Q) {
  if (query != null) {
    return `${config.apiUrl}/${segment}?take=${query.take}&cursor=${query.cursor}` as const;
  }
  return `${config.apiUrl}/${segment}` as const;
}
