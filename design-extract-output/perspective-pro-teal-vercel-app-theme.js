// React Theme — extracted from https://perspective-pro-teal.vercel.app/
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '11': string;
    '12': string;
    '16': string;
    '24': string;
 *   };
 *   space: {
    '2': string;
    '32': string;
    '40': string;
    '56': string;
 *   };
 *   radii: {
    lg: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#0022ff",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#ffffff",
    "neutral100": "#000000"
  },
  "fonts": {
    "body": "'Zalando Sans SemiExpanded', sans-serif"
  },
  "fontSizes": {
    "11": "11px",
    "12": "12px",
    "16": "16px",
    "24": "24px"
  },
  "space": {
    "2": "2px",
    "32": "32px",
    "40": "40px",
    "56": "56px"
  },
  "radii": {
    "lg": "16px",
    "xl": "24px",
    "full": "32px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455677 0.0000200868 / 0.8) 0px 0px 0px 2px, rgba(255, 255, 255, 0.3) 0px 0px 20px 0px",
    "xs": "rgba(255, 255, 255, 0.3) 0px 1px 1px 0px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 32px 64px -16px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#0022ff",
      "light": "hsl(232, 100%, 65%)",
      "dark": "hsl(232, 100%, 35%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#050505"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "'Zalando Sans SemiExpanded', sans-serif",
    "h2": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "36px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24px"
    },
    "body2": {
      "fontSize": "11px",
      "fontWeight": "400",
      "lineHeight": "16.5px"
    }
  },
  "shape": {
    "borderRadius": 12
  },
  "shadows": [
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 8px 16px 0px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 6px 16px -4px, rgba(0, 0, 0, 0.05) 0px 2px 6px -2px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px inset",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 0px 24px 48px 0px"
  ]
};

export default theme;
