import React from "react";
import { Image } from "react-native";
import { Text } from "react-native-elements";

import Box, { Row } from "../Box";

interface HeaderTitleProps {
  title: string;
}

export default function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <Row flex={1} alignItems="center">
      <Image
        style={{ width: 33, height: 33 }}
        source={require("../../assets/images/round-logo.png")}
      />
      <Box p={2} />
      <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
        {title}
      </Text>
    </Row>
  );
}
