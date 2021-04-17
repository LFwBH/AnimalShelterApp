import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { LostPet } from "../models/LostPet";
import { APIResponse, QueryFnContext } from "../types/api";

export const LOST_PETS_KEY = "lost_pets";

interface LostPetQueryFilters {
  description?: string;
}

export function fetchLostPetList({
  pageParam,
  description,
}: QueryFnContext & LostPetQueryFilters) {
  const payload: Record<string, string | number | undefined> = {
    cursor: pageParam,
    take: 10,
  };

  if (description) {
    payload["filter[description]"] = description;
  }

  const query = composeApiQuery(payload);
  const url = composeApiUrl("lost_pet", query);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<LostPet[]>
  >;
}

export function fetchLostPetById({ petId }: { petId: number }) {
  const url = composeApiUrl(`lost_pet/${petId}`);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<LostPet>
  >;
}
