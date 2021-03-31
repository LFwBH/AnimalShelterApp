import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Pet } from "../models/Pet";
import { APIResponse, QueryFnContext } from "../types/api";

export const PETS_KEY = "pets";

export function fetchPetList({ pageParam: page = 1, name }: any) {
  const query = composeApiQuery({
    cursor: page,
    take: 10,
    "filter[name]": name,
  });
  const url = composeApiUrl("pets", query);
  console.log(name, "herya");
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet[]>
  >;
}

export function fetchPetById({ petId }: { petId: number }) {
  const url = composeApiUrl(`pets/${petId}`);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet>
  >;
}

export function filter() {
  const url = composeApiUrl(`pets?take=10&filter[name]=Kathy`);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet[]>
  >;
}
