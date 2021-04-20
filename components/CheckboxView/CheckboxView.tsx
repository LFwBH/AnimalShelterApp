import React, { useState } from "react";
import { CheckBox } from "react-native-elements";

import { useTheme } from "../../constants/styled-components";
import Box from "../Box";

interface CheckboxViewProps {
  label: string;
}

export default function CheckboxView({ label }: CheckboxViewProps) {
  const theme = useTheme();

  const [checkbox, setCheckbox] = useState(false);

  return (
    <Box display="flex" width="100%">
      <CheckBox
        iconRight
        title={label}
        containerStyle={{
          backgroundColor: theme.palette.background,
          width: "50%",
          borderColor: theme.palette.background,
        }}
      />
    </Box>
  );
}
