import React, { useCallback, useState } from "react";
import { CheckBox, Text } from "react-native-elements";

import Box from "../Box";

interface IProps {
  label: string;
  firstVar: string;
  secondVar: string;
  thirdVar?: string;
  forthVar?: string;
}

export default function CheckboxVariant({
  label,
  firstVar,
  secondVar,
  thirdVar,
  forthVar,
}: IProps) {
  const [checkbox, setCheckbox] = useState({
    firstCheckbox: false,
    secondCheckbox: false,
    thirdCheckbox: false,
    forthCheckbox: false,
  });

  const handleCheckbox = useCallback(
    (name) => () => {
      if (name === "first") {
        setCheckbox({ ...checkbox, firstCheckbox: !checkbox.firstCheckbox });
      } else if (name === "second") {
        setCheckbox({ ...checkbox, secondCheckbox: !checkbox.secondCheckbox });
      } else if (name === "third") {
        setCheckbox({ ...checkbox, thirdCheckbox: !checkbox.thirdCheckbox });
      } else if (name === "forth") {
        setCheckbox({ ...checkbox, forthCheckbox: !checkbox.forthCheckbox });
      }
    },
    [checkbox],
  );

  return (
    <Box display="flex" width="100%" m={2}>
      <Text>{label}</Text>
      <Box
        display="flex"
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row">
          <CheckBox
            center
            title={firstVar}
            checked={checkbox.firstCheckbox}
            onPress={handleCheckbox("first")}
            containerStyle={{
              backgroundColor: "#f2f2f2",
              width: "50%",
              borderColor: "#f2f2f2",
            }}
          />
          <CheckBox
            center
            title={secondVar}
            checked={checkbox.secondCheckbox}
            onPress={handleCheckbox("second")}
            containerStyle={{
              backgroundColor: "#f2f2f2",
              width: "50%",
              borderColor: "#f2f2f2",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="row">
          {thirdVar && (
            <CheckBox
              center
              title={thirdVar}
              checked={checkbox.thirdCheckbox}
              onPress={handleCheckbox("third")}
              containerStyle={{
                backgroundColor: "#f2f2f2",
                width: "50%",
                borderColor: "#f2f2f2",
              }}
            />
          )}
          {forthVar && (
            <CheckBox
              center
              title={forthVar}
              checked={checkbox.forthCheckbox}
              onPress={handleCheckbox("forth")}
              containerStyle={{
                backgroundColor: "#f2f2f2",
                width: "50%",
                borderColor: "#f2f2f2",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
