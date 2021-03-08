import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Pet } from "../models/Pet";
import { APIResponse, QueryFnContext } from "../types/api";

export const PETS_KEY = "pets";

export function fetchPetList({ pageParam: page = 1 }: QueryFnContext) {
  const query = composeApiQuery({ cursor: page });
  const url = composeApiUrl("pets", query);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet[]>
  >;
}

export function fetchPetById({ petId }: { petId: number }) {
  const url = composeApiUrl(`pets/${petId}`);
  console.log("---------------------", url);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet>
  >;
}
