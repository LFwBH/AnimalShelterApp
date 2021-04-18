import React from "react";
import { Image } from "react-native";
import { Text } from "react-native-elements";
import { justifyContent } from "styled-system";

import Box from "../Box";

interface IProps {
  title: string;
  logo?: boolean;
}

export default function HeaderTitle({ title, logo }: IProps) {
  return (
    <Box style={{ borderColor: "#6B96E4" }}>
      {logo && (
        <Box style={{ position: "absolute" }}>
          <Image
            style={{ width: 33, height: 33 }}
            source={require("../../assets/images/round-logo.png")}
          />
        </Box>
      )}
      {logo ? (
        <Box
          style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
            {title}
          </Text>
        </Box>
      ) : (
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
            paddingRight: 50,
          }}
        >
          {title}
        </Text>
      )}
    </Box>
  );
}
