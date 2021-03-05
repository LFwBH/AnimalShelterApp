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
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  display,
  DisplayProps,
} from "styled-system";

import { PaletteProps } from "../../constants/theme";

type StyledPropertiesType = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  DisplayProps;

const styledSystemProperties = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  display,
  shadow,
);

const Box = styled.View<StyledPropertiesType & PaletteProps>`
  background-color: ${mapToTheme("components.box")};
  ${styledSystemProperties};
`;

export default Box;
