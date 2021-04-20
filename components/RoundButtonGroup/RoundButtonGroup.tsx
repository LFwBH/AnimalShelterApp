import React, { useCallback, useState } from "react";
import { ButtonGroup, Image, Input, Text } from "react-native-elements";

import { useTheme } from "../../constants/styled-components";
import Box from "../Box";

interface RoundButtonGroupProps {
  label?: string;
  firstButton: string;
  secondButton: string;
  thirdButton?: string;
  errorMessage?: string;
}

export default function RoundButtonGroup({
  label,
  firstButton,
  secondButton,
  thirdButton,
  errorMessage,
}: RoundButtonGroupProps) {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(false);
  const [defaultErrorMessage, setDefaultErrorMessage] = useState("");

  const FirstButton = () => (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        source={
          selectedIndex == 0
            ? require("../../assets/images/round-button-checked.png")
            : require("../../assets/images/round-button.png")
        }
        style={{ width: 20, height: 20, marginRight: 5 }}
        resizeMode="contain"
      />
      <Text>{firstButton}</Text>
    </Box>
  );

  const SecondButton = () => (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        source={
          selectedIndex == 1
            ? require("../../assets/images/round-button-checked.png")
            : require("../../assets/images/round-button.png")
        }
        style={{ width: 20, height: 20, marginRight: 5 }}
        resizeMode="contain"
      />
      <Text>{secondButton}</Text>
    </Box>
  );

  const ThirdButton = () => (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        source={
          selectedIndex == 2
            ? require("../../assets/images/round-button-checked.png")
            : require("../../assets/images/round-button.png")
        }
        style={{ width: 20, height: 20, marginRight: 5 }}
        resizeMode="contain"
      />
      <Text>{thirdButton}</Text>
    </Box>
  );

  const twoButtonGroup = [{ element: FirstButton }, { element: SecondButton }];

  const threeButtonGroup = [
    { element: FirstButton },
    { element: SecondButton },
    { element: ThirdButton },
  ];

  const handleChangeInput = useCallback(
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

  const handleUpdateIndex = useCallback((value) => setSelectedIndex(value), []);

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      {label && <Text>{label}</Text>}
      <ButtonGroup
        containerStyle={{
          borderColor: theme.palette.background,
          justifyContent: "flex-start",
        }}
        buttonContainerStyle={{
          backgroundColor: theme.palette.background,
          borderColor: theme.palette.background,
        }}
        onPress={handleUpdateIndex}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: theme.palette.background,
        }}
        // @ts-expect-error ts(2322)
        buttons={thirdButton ? threeButtonGroup : twoButtonGroup}
      />
      {selectedIndex === 2 && errorMessage && (
        <Input
          placeholder="Ваш ответ"
          onChangeText={handleChangeInput}
          renderErrorMessage={error}
          errorMessage={defaultErrorMessage}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: theme.palette.primary,
            paddingBottom: 15,
            height: 40,
            paddingTop: 15,
          }}
          labelStyle={{
            color: theme.palette.text,
            fontWeight: "normal",
            paddingBottom: 5,
          }}
          inputStyle={{
            fontSize: 14,
          }}
        />
      )}
    </Box>
  );
}
