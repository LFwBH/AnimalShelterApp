import { Ionicons } from "@expo/vector-icons";
import { themeGet } from "@styled-system/theme-get";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Row } from "../../components/Box";
import styled from "../../constants/styled-components";

export const DepartureItem = styled(Row).attrs({
  borderRadius: 2,
})`
  border: 1px solid ${themeGet("palette.disabled")};
`;

export const BackButton = styled(TouchableOpacity).attrs({
  containerStyle: {
    position: "absolute",
    left: 0,
  },
})``;

export const BackIcon = styled(Ionicons).attrs({
  name: "chevron-back",
  size: 34,
})`
  color: ${themeGet("palette.background")};
`;
