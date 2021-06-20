import React, { useCallback, useState } from "react";

import { StyledInput, StyledInputProps } from "./styles";

interface InputFieldProps extends StyledInputProps {
  label?: string;
  errorLabel?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export default function InputField({
  errorLabel,
  placeholder,
  onChangeText,
  ...rest
}: InputFieldProps & React.ComponentProps<typeof StyledInput>) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeText = useCallback(
    (value) => {
      if (!value) {
        setErrorMessage(errorLabel ?? "");
        setError(true);
      } else {
        setErrorMessage("");
        setError(false);
      }
    },
    [errorLabel],
  );

  return (
    <StyledInput
      {...rest}
      placeholder={placeholder ?? "Ваш ответ"}
      onChangeText={onChangeText ?? handleChangeText}
      renderErrorMessage={error}
      errorMessage={errorMessage}
    />
  );
}
