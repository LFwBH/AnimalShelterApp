import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "./constants/styled-components";
import theme from "./constants/theme";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  return !isLoadingComplete ? null : (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar backgroundColor={theme.palette.primary} />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
