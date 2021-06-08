import noop from "lodash/noop";
import React, { useCallback, useState } from "react";
import { TextInput } from "react-native";
import { Text } from "react-native-elements";

import { useTheme } from "../../constants/styled-components";
import Box from "../Box";

interface CustomInputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function CustomInputField({
  label,
  placeholder,
  value: defaultValue,
  onChange = noop,
}: CustomInputFieldProps) {
  const theme = useTheme();

  const [value, setValue] = useState(defaultValue);

  const handleInput = useCallback(
    (text: string) => {
      setValue(text);
      onChange(text);
    },
    [onChange],
  );

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      <Text>{label}</Text>
      <TextInput
        style={{
          backgroundColor: theme.palette.background,
          height: 100,
          paddingHorizontal: 10,
          marginTop: 10,
          borderColor: theme.palette.primary,
          borderWidth: 1,
        }}
        value={value}
        onChangeText={handleInput}
        placeholder={placeholder ?? "Ваш ответ"}
        multiline
        textAlignVertical="top"
        textBreakStrategy="simple"
        numberOfLines={10}
      />
    </Box>
  );
}
