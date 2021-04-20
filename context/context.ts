import React from "react";

export interface ContextUser {
  token?: string | null;
  email?: string | null;
}

interface AppContext {
  user?: ContextUser | null;
  changeUser: (user: ContextUser) => Promise<void>;
  clearUser: () => Promise<void>;
}

export const AppContext = React.createContext<AppContext>({
  user: null,

  changeUser() {
    throw new Error("Function is not defined");
  },

  clearUser() {
    throw new Error("Function is not defined");
  },
});
