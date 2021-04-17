import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "./constants/styled-components";
import theme from "./constants/theme";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

if (__DEV__) {
  // @ts-expect-error ts(7016)
  import("./reactotron.config");
}

const client = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  return !isLoadingComplete ? null : (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar backgroundColor={theme.palette.primary} />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
