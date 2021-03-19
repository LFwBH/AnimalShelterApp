import React, { useCallback, useState } from "react";
import { Input } from "react-native-elements";

import Box from "../Box";

interface IProps {
  label: string;
  errorMessage?: string;
}

export default function InputField({ label, errorMessage }: IProps) {
  const [error, setError] = useState(false);
  const [defaultErrorMessage, setDefaultErrorMessage] = useState("");
  const handleInput = useCallback((value) => {
    if (!value) {
      setDefaultErrorMessage(errorMessage!);
      setError(true);
    } else {
      setDefaultErrorMessage("");
      setError(false);
    }
  }, []);

  return (
    <Box display="flex" width="100%">
      <Input
        label={label}
        placeholder="Ваш ответ"
        onChangeText={handleInput}
        renderErrorMessage={error}
        errorMessage={defaultErrorMessage}
      />
    </Box>
  );
}
