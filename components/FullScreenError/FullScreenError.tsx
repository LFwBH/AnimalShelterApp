import React from "react";

import i18n from "../../i18n";
import Box from "../Box";
import Text from "../Text";

export default function FullScreenError() {
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text>{i18n("common.error")} :(</Text>
    </Box>
  );
}
