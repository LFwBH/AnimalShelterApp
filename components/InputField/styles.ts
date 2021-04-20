import { themeGet } from "@styled-system/theme-get";
import { Input } from "react-native-elements";

import styled from "../../constants/styled-components";

export const StyledInput = styled(Input).attrs({
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingBottom: 15,
  },
  labelStyle: {
    color: "#000",
    fontWeight: "normal",
    paddingBottom: 5,
    fontSize: 14,
  },
  inputStyle: {
    fontSize: 14,
  },
})`
  padding-left: ${themeGet("space.2")}px;
  padding-right: ${themeGet("space.2")}px;
  border-radius: ${themeGet("space.1")}px;
  border-color: ${themeGet("palette.primary")};
  border-width: 1px;
  height: 40px;
`;
