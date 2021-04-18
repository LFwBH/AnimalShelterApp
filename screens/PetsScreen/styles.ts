import { Button } from "react-native-elements";

import styled from "../../constants/styled-components";

interface FilterButtonProps {
  active: boolean;
}

export const FilterButton = styled(Button).attrs(({ theme }) => ({
  buttonStyle: {
    backgroundColor: theme.palette.primary,
    paddingLeft: theme.space[3],
    paddingRight: theme.space[3],
    paddingTop: theme.space[1],
    paddingBottom: theme.space[1],
    borderRadius: theme.layout.window.width,
  },
  titleStyle: {
    fontSize: theme.fontSizes.sm,
  },
  containerStyle: {
    borderRadius: theme.layout.window.width,
    width: 120,
  },
}))<FilterButtonProps>``;
