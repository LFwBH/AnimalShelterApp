import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Settings } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "./constants/styled-components";
import theme from "./constants/theme";
import { AppContext, ContextUser } from "./context/context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

if (__DEV__) {
  // @ts-expect-error ts(7016)
  import("./reactotron.config");
}

Settings.defaultLocale = "ru";

const client = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [user, setUser] = useState<ContextUser | null>(null);

  const handleChangeUser = useCallback(async (data: ContextUser) => {
    try {
      await AsyncStorage.multiSet([
        ["access_token", data.token ?? ""],
        ["email", data.email ?? ""],
      ]);

      setUser(data);
    } catch {}
  }, []);

  const handleClearUser = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "email"]);
      setUser(null);
    } catch {}
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const [[, access_token], [, email]] = await AsyncStorage.multiGet([
          "access_token",
          "email",
        ]);

        setUser({
          email,
          token: access_token,
        });
      } catch {}
    })();
  }, []);

  return !isLoadingComplete ? null : (
    <AppContext.Provider
      value={{
        user,
        changeUser: handleChangeUser,
        clearUser: handleClearUser,
      }}
    >
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar backgroundColor={theme.palette.primary} />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
