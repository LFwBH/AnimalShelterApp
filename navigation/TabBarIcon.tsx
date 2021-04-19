import React from "react";
import { ImageSourcePropType } from "react-native";

import Text from "../components/Text";
import { StyledImage } from "./styles";

interface TabBarIconProps {
  src: ImageSourcePropType;
  focused: boolean;
}

export const TabBarIcon = ({ src, focused }: TabBarIconProps) => {
  return (
    <StyledImage
      source={src}
      opacity={focused ? 1 : 0.6}
      resizeMode="contain"
    />
  );
};

interface TabBarLabelProps {
  label: string;
  focused: boolean;
}

export const TabBarLabel = ({ focused, label }: TabBarLabelProps) => {
  return (
    <Text opacity={focused ? 1 : 0.6} background fontSize={11}>
      {label}
    </Text>
  );
};
