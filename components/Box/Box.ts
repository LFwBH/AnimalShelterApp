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
} from "styled-system";

import { PaletteProps } from "../../constants/theme";

type StyledPropertiesType = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  ShadowProps;

const styledSystemProperties = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  shadow,
);

const Box = styled.View<StyledPropertiesType & PaletteProps>`
  background-color: ${mapToTheme("components.box")};
  ${styledSystemProperties};
`;

export const Col = styled.View<StyledPropertiesType & PaletteProps>`
  display: flex;
  flex-direction: column;
  ${styledSystemProperties};
`;

export const Row = styled.View<StyledPropertiesType & PaletteProps>`
  display: flex;
  flex-direction: row;
  ${styledSystemProperties};
`;

export default Box;
