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

  const component1 = () => (
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
  const component2 = () => (
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
  const component3 = () => (
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

  const buttonsTwo = [{ element: component1 }, { element: component2 }];
  const buttonsThree = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
  ];

  const handleInput = useCallback((value) => {
    if (!value) {
      setDefaultErrorMessage(errorMessage!);
      setError(true);
    } else {
      setDefaultErrorMessage("");
      setError(false);
    }
  }, []);

  const updateIndex = useCallback(
    (value) => {
      setSelectedIndex(value);
    },
    [selectedIndex],
  );

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      {label && <Text>{label}</Text>}
      <ButtonGroup
        containerStyle={{ height: 50, borderColor: "#f2f2f2" }}
        buttonStyle={{ backgroundColor: "#f2f2f2", borderColor: "#f2f2f2" }}
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: "#f2f2f2",
          borderColor: "#f2f2f2",
        }}
        buttons={thirdButton ? buttonsThree : buttonsTwo}
      />
      {selectedIndex === 2 && errorMessage && (
        <Input
          placeholder="Ваш ответ"
          onChangeText={handleInput}
          renderErrorMessage={error}
          errorMessage={defaultErrorMessage}
        />
      )}
    </Box>
  );
}
