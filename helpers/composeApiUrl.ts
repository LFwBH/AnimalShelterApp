import qs from "qs";

import config from "../constants/config";
import { Query } from "../types/api";

export default function composeApiUrl(segment: string, query?: Query) {
  const url = `${config.apiUrl}/${segment}`;
  if (query) {
    return `${url}?${qs.stringify(query)}`;
  }
  return url;
}
