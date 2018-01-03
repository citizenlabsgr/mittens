
const radius = 10;
const focusColor = "#45BFFE";
export const vars = {
  smallScreen: 500,
  fontFamily: '"Open Sans", sans',
  fontSize: 18,
  lineHeight: 1.5,
  textTransform: "capitalize",
  spacing: 24,
  smallSpacing: 12,
  color: {
    background: "#788595",
    focus: focusColor,
    font: "#333",
    fontLight: "#777",
    theme: "#475B6E",
    themeLight: "#516476",
    lightest: "#f5f5f5",
    action: "#FF803A",
    actionight: "#FF9861",
    warn: "#F17B26",
    warnLight: "#F86761",
    success: "#B2FF55",
    successLight: "#ACE572",
    white: "#fff",
    whiteLight: "#EFEFEF",
    whiteTransparent: "rgba(255, 255, 255, 0.2)"
  },
  border: {
    borderColor: "#ddd",
    borderWidth: 2,
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
      border: `2px solid #fff`,
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
  ...vars.clearFix,
}

export const clearfix = {
  ':after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
}
