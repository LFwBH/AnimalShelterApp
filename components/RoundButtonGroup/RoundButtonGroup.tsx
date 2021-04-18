import React, { useCallback, useState } from "react";
import { ButtonGroup, Image, Input, Text } from "react-native-elements";

import Box from "../Box";

interface IProps {
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
}: IProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(false);
  const [defaultErrorMessage, setDefaultErrorMessage] = useState("");

  const Component1 = () => (
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

  const Component2 = () => (
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

  const Component3 = () => (
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

  const buttonsTwo = [{ element: Component1 }, { element: Component2 }];

  const buttonsThree = [
    { element: Component1 },
    { element: Component2 },
    { element: Component3 },
  ];

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

  const handleUpdateIndex = useCallback((value) => setSelectedIndex(value), []);

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      {label && <Text>{label}</Text>}
      <ButtonGroup
        containerStyle={{ borderColor: "#fff", justifyContent: "flex-start" }}
        buttonContainerStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
        onPress={handleUpdateIndex}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: "#fff",
        }}
        // @ts-expect-error ts(2322)
        buttons={thirdButton ? buttonsThree : buttonsTwo}
      />
      {selectedIndex === 2 && errorMessage && (
        <Input
          placeholder="Ваш ответ"
          onChangeText={handleInput}
          renderErrorMessage={error}
          errorMessage={defaultErrorMessage}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: "#6B96E4",
            paddingBottom: 15,
            height: 40,
            paddingTop: 15,
          }}
          labelStyle={{
            color: "#000",
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
