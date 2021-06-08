import * as StyledComponents from "styled-components/native";

import type theme from "./theme";

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = StyledComponents as unknown as StyledComponents.ReactNativeThemedStyledComponentsModule<
  typeof theme
>;

export { css, ThemeProvider, useTheme };
export default styled;
