import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Auth } from "../models/Auth";
import { APIResponse } from "../types/api";

export function register(payload: Auth) {
  const url = composeApiUrl("auth/register");

  const form = new FormData();
  form.append("email", payload.email);
  form.append("password", payload.password);

  return fetch(url, { body: form }).then(processFetchResponse(url)) as Promise<
    APIResponse<Auth>
  >;
}

export function login(payload: Auth) {
  const url = composeApiUrl("auth/login");

  const form = new FormData();
  form.append("email", payload.email);
  form.append("password", payload.password);

  return fetch(url, { body: form }).then(processFetchResponse(url)) as Promise<
    APIResponse<Auth>
  >;
}
