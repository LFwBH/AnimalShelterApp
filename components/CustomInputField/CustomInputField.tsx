import React, { useCallback, useState } from "react";
import { TextInput } from "react-native";
import { Text } from "react-native-elements";

import Box from "../Box";

interface IProps {
  label: string;
}

export default function CustomInputField({ label }: IProps) {
  const [data, setData] = useState("");
  const handleInput = useCallback((value) => {
    setData(value);
  }, []);

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      <Text>{label}</Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          height: 100,
          paddingHorizontal: 10,
          marginTop: 10,
          borderColor: "#5381D6",
          borderWidth: 1,
        }}
        value={data}
        onChangeText={handleInput}
        placeholder="Ваш ответ"
        multiline
        textAlignVertical="top"
        textBreakStrategy="simple"
        numberOfLines={10}
      />
    </Box>
  );
}
