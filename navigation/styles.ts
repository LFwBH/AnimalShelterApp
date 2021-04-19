import { color, ColorProps } from "styled-system";

import styled from "../constants/styled-components";

export const StyledImage = styled.Image<ColorProps>`
  width: 24px;
  height: 24px;

  ${color};
`;
