import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Auth, Token } from "../models/Auth";
import { APIResponse } from "../types/api";

export function register(payload: Auth) {
  const url = composeApiUrl("auth/register");
  return fetch(url, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(processFetchResponse(url)) as Promise<APIResponse<Token>>;
}

export function login(payload: Auth) {
  const url = composeApiUrl("auth/login");
  return fetch(url, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(processFetchResponse(url)) as Promise<APIResponse<Token>>;
}
