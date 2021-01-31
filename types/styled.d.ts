import "styled-components";

declare module "styled-components" {
  interface Palette {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    disabled: string;
    accent: string;
    accentDark: string;
    transparent: string;
  }

  interface FontSizes {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }

  interface FontWeights {
    normal: string;
    semi: string;
    bold: string;
  }

  interface Layout {
    window: {
      width: number;
      height: number;
    };
    isSmallDevice: boolean;
  }

  interface Components {
    box: Palette & {
      default: palette.transparent;
    };
    text: Palette & {
      default: palette.text;
    };
  }

  export interface DefaultTheme {
    space: number[];
    borderRadius: number[];
    fontSizes: FontSizes;
    fontWeights: FontWeights;
    palette: Palette;
    components: Components;
    layout: Layout;
  }
}
