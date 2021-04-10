import React, { useCallback, useState } from "react";
import { Input } from "react-native-elements";

import Box from "../Box";

interface IProps {
  label: string;
  errorMessage?: string;
  placeholderText?: string;
}

export default function InputField({
  label,
  errorMessage,
  placeholderText,
}: IProps) {
  const [error, setError] = useState(false);
  const [defaultErrorMessage, setDefaultErrorMessage] = useState("");

  const handleInput = useCallback(
    (value) => {
      if (!value) {
        setDefaultErrorMessage(errorMessage ?? "");
        setError(true);
      } else {
        setDefaultErrorMessage("");
        setError(false);
      }
    },
    [errorMessage],
  );

  return (
    <Box display="flex" width="100%">
      <Input
        label={label}
        style={{ borderWidth: 1, height: 40, borderColor: "#5381D6" }}
        placeholder={placeholderText || "Ваш ответ"}
        onChangeText={handleInput}
        renderErrorMessage={error}
        errorMessage={defaultErrorMessage}
      />
    </Box>
  );
}
