import composeApiUrl from "../helpers/composeApiUrl";
import processFetchResponse from "../helpers/processFetchResponse";
import { Auth } from "../models/Auth";
import { APIResponse } from "../types/api";

export function register(dataArr: Auth) {
  const data = { email: dataArr.email, password: dataArr.password };
  const url = composeApiUrl("auth/register");
  return fetch(url, data as any).then(processFetchResponse(url)) as Promise<
    APIResponse<Auth>
  >;
}

export function login(dataArr: Auth) {
  const data = { email: dataArr.email, password: dataArr.password };
  const url = composeApiUrl("auth/login");
  return fetch(url, data as any).then(processFetchResponse(url)) as Promise<
    APIResponse<Auth>
  >;
}
