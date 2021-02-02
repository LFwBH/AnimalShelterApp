import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import { Pet } from "../models/Pet";
import { APIResponse, QueryFnContext } from "../types/api";

export const PETS_KEY = "pets";

export function fetchPetList({ pageParam: page = 1 }: QueryFnContext) {
  const query = composeApiQuery({ page });
  const url = composeApiUrl("pets", query);
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`[HTTP ${response.status}] ${url}`);
    }
    return response.json();
  }) as Promise<APIResponse<Pet[]>>;
}
