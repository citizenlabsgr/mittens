import * as chroma from 'chroma-js'

export const themeGradient = chroma.scale(["#E37B40", "#F5F5F5"]).mode('lab');
export function themeSteps(i: number): string {
  return themeGradient(i / 9).hex();
}

// Breakpoints
const radius = 10;
const focusColor = "rgba(133, 191, 253, 1)";
export const vars = {
  smallScreen: 500,
  fontFamily: '"Open Sans", sans',
  fontSize: 16,
  lineHeight: 1.5,
  spacing: 24,
  smallSpacing: 12,
  color: {
    themeSteps: themeSteps,
    focus: focusColor,
    font: "#333",
    fontLight: "#777",
    theme: themeSteps(0),
    themeLight: themeSteps(3),
    background: themeSteps(6),
    lightest: themeSteps(9),
    action: "#324D5C",
    actionLight: "#537E96",
    warn: "#DE5B49",
    warnLight: "#DE9B92",
    success: "#88B298",
    successLight: "#AFE5C3",
    white: "#fff",
    whiteLight: themeSteps(8)
  },
  border: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: radius,
  },
  borderSimple: "1px solid #ddd",
  shadow: {
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.1)",
    insetBoxShadow: "inset 2px 2px 3px rgba(0, 0, 0, 0.1)",
    deepShadow: "0px 0px 2px rgba(0, 0, 0, 0.15), 5px 5px 5px rgba(0, 0, 0, 0.3)"
  },

  focus: {
    position: 'relative',
    ':focus': {
      outline: "none",
      boxShadow: `0 0 10px ${focusColor}, 0 0 1px ${focusColor}, 0 0 0px ${focusColor}`,
      zIndex: 1
    }
  },

  inputFocus: {
    ':focus': {
      outline: "none",
      boxShadow: `inset 2px 2px 3px rgba(0,0,0, 0.1), 0 0 10px ${focusColor}, 0 0 1px ${focusColor}, 0 0 0px ${focusColor}`,
      zIndex: 1
    }
  },
  clearFix: {
    ':after': {
      clear: 'both',
      content: '""',
      display: 'table'
    }
  },
  screenreaderOnly: {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden'
  },
}

export const centeredBox = {
  position: 'relative',
  margin: `${vars.spacing}px auto`,
  maxWidth: 600,
  backgroundColor: vars.color.white,
  ...vars.border,
  ...vars.clearFix,
}

export const clearfix = {
  ':after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
}
