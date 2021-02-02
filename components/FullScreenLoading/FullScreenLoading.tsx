import React from "react";
import { ActivityIndicator } from "react-native";

import { useTheme } from "../../constants/styled-components";
import Box from "../Box";

export default function FullScreenLoading() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <ActivityIndicator size="large" color={theme.palette.primary} />
    </Box>
  );
}
