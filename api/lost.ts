import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { LostPet } from "../models/LostPet";
import { APIResponse } from "../types/api";

export const LOST_PETS_KEY = "lost_pets";

export function fetchLostPetList({ pageParam: page = 1 }: any) {
  const query = composeApiQuery({
    cursor: page,
    take: 10,
  });
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
