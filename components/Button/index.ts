import merge from "lodash/merge";
import { Button as NativeButton } from "react-native-elements";

import styled from "../../constants/styled-components";
import type ThemeType from "../../constants/theme";

interface CommonButtonProps {
  width?: number | string;
  variant?: keyof typeof ThemeType["palette"];
}

interface RoundButtonProps {
  round?: boolean;
  square?: never;
}

interface SquareButtonProps {
  round?: never;
  square?: boolean;
}

type ButtonProps = CommonButtonProps & (RoundButtonProps | SquareButtonProps);

const Button = styled(NativeButton).attrs<ButtonProps>(
  ({ theme, variant = "primary", round, width, ...rest }) =>
    merge(
      {
        buttonStyle: {
          backgroundColor: theme.palette[variant],
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[1],
          borderRadius: round
            ? theme.layout.window.width
            : theme.borderRadius[2],
        },
        titleStyle: {
          fontSize: theme.fontSizes.sm,
        },
        containerStyle: {
          borderRadius: round
            ? theme.layout.window.width
            : theme.borderRadius[2],
          width,
        },
      },
      rest,
    ),
)<ButtonProps>``;

export default Button;
