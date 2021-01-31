import styled from "styled-components/native";
import { mapToTheme } from "styled-map";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

import { PaletteProps } from "../../constants/theme";

type StyledPropertyTypes = TypographyProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  FontSizeProps &
  FontWeightProps;

const styledSystemProperties = compose(
  typography,
  space,
  color,
  layout,
  flexbox,
  border,
  fontSize,
  fontWeight,
);

const Text = styled.Text<StyledPropertyTypes & PaletteProps>`
  color: ${mapToTheme("components.text")};
  ${styledSystemProperties};
`;

export default Text;
