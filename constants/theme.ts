import { Dimensions } from "react-native";

import {
  BACKGROUND,
  DISABLED,
  PRIMARY,
  SECONDARY,
  SUCCESS,
  TEXT,
  TRANSPARENT,
  WARNING,
} from "./colors";

const MIN_WIDTH = 375;

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const palette = {
  background: BACKGROUND,
  text: TEXT,
  primary: PRIMARY,
  secondary: SECONDARY,
  disabled: DISABLED,
  success: SUCCESS,
  warning: WARNING,
  transparent: TRANSPARENT,
};

const theme = {
  shadow: {
    pt4: {
      shadowColor: palette.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    pt12: {
      shadowColor: palette.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    pt18: {
      shadowColor: palette.text,
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,
    },
    pt24: {
      shadowColor: palette.text,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16,

      elevation: 24,
    },
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  borderRadius: [0, 2, 4],
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    normal: "400",
    semi: "700",
    bold: "900",
  },
  palette,
  components: {
    box: {
      ...palette,
      default: palette.transparent,
    },
    text: {
      ...palette,
      default: palette.text,
    },
  },
  layout: {
    window: {
      width: WIDTH,
      height: HEIGHT,
    },
    isSmallDevice: WIDTH < MIN_WIDTH,
  },
};

export default theme;

export type PaletteProps = {
  [K in keyof typeof palette]?: boolean;
};
