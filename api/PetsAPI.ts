import { Pet } from "../models/Pet";
import { APIResponse } from "../types/api";

export const PETS_KEY = "pets";

export function fetchPetList({ pageParam: page = 1 } = {}) {
  const url = `https://great-squid-43.loca.lt/pets?_page=${page}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`[HTTP ${response.status}] ${url}`);
    }
    return response.json();
  }) as Promise<APIResponse<Pet[]>>;
}
