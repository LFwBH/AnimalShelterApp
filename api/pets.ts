import AsyncStorage from "@react-native-async-storage/async-storage";
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
  favorites?: boolean;
}

export const PET_SEX_ALIAS: Record<PET_SEX, "Boy" | "Girl"> = {
  [PET_SEX.BOY]: "Boy",
  [PET_SEX.GIRL]: "Girl",
};

export const PET_KIND_ALIAS: Record<PET_KIND, "Cat" | "Dog"> = {
  [PET_KIND.CAT]: "Cat",
  [PET_KIND.DOG]: "Dog",
};

export async function fetchPetList({
  pageParam,
  name,
  sex,
  kind,
  favorites,
}: QueryFnContext & PetQueryFilters) {
  const payload: Record<string, string | number | boolean | undefined> = {
    cursor: pageParam,
    take: 10,
  };

  if (sex != null && !favorites) {
    payload["filter[sex]"] = PET_SEX_ALIAS[sex];
  }

  if (kind != null && !favorites) {
    payload["filter[kind]"] = PET_KIND_ALIAS[kind];
  }

  if (name && !favorites) {
    payload["filter[name]"] = trim(name);
  }

  const query = composeApiQuery(payload);
  const url = composeApiUrl(favorites ? "favorite_pet" : "pets", query);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, { headers }).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet[]>
  >;
}

export function fetchPetById({ petId }: { petId: number }) {
  const url = composeApiUrl(`pets/${petId}`);
  return fetch(url).then(processFetchResponse(url)) as Promise<
    APIResponse<Pet>
  >;
}
