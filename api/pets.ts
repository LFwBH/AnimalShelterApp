import trim from "lodash/trim";

import composeApiQuery from "../helpers/composeApiQuery";
import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Pet } from "../models/Pet";
import { APIResponse, QueryFnContext } from "../types/api";

export const PETS_KEY = "pets";

export enum PET_SEX {
  BOY,
  GIRL,
}

export enum PET_KIND {
  DOG,
  CAT,
}

interface PetQueryFilters {
  name?: string;
  sex?: PET_SEX;
  kind?: PET_KIND;
}

const PET_SEX_ALIAS: Record<PET_SEX, "Boy" | "Girl"> = {
  [PET_SEX.BOY]: "Boy",
  [PET_SEX.GIRL]: "Girl",
};

const PET_KIND_ALIAS: Record<PET_KIND, "Cat" | "Dog"> = {
  [PET_KIND.CAT]: "Cat",
  [PET_KIND.DOG]: "Dog",
};

export function fetchPetList({
  pageParam,
  name,
  sex,
  kind,
}: QueryFnContext & PetQueryFilters) {
  const payload: Record<string, string | number | undefined> = {
    cursor: pageParam,
    take: 10,
  };

  if (sex != null) {
    payload["filter[sex]"] = PET_SEX_ALIAS[sex];
  }

  if (kind != null) {
    payload["filter[kind]"] = PET_KIND_ALIAS[kind];
  }

  if (name) {
    payload["filter[name]"] = trim(name);
  }

  const query = composeApiQuery(payload);
  const url = composeApiUrl("pets", query);
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
