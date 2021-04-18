import { themeGet } from "@styled-system/theme-get";
import { Input } from "react-native-elements";

import styled from "../../constants/styled-components";

export const StyledInput = styled(Input).attrs({
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
})`
  padding-left: ${themeGet("space.2")}px;
  padding-right: ${themeGet("space.2")}px;
  border-radius: ${themeGet("space.2")}px;
  border-color: ${themeGet("palette.primary")};
  border-width: 2px;
  height: 40px;
`;
