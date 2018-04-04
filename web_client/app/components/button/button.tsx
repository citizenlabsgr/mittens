import * as React from 'react';
import { vars, css, Style } from 'styles/css';

export interface AnyButtonProps {
  tabIndex?: number
  css?: Style
  replacementCss?: Style
  autofocus?: boolean
  ariaLabel?: string | null
  title?: string
  role?: string
  theme?: string
  flex?: boolean
  square?: boolean
  testName?: string
  disabled?: boolean
  // Aria hint if the button makes a popup menu.
  hasPopup?: boolean
}

export interface ButtonProps {
  action: (e: React.MouseEvent<HTMLButtonElement>) => void
};

export class Button extends React.Component<ButtonProps & AnyButtonProps, {}> {
  static defaultProps = {
    tabIndex: 0,
    ariaLabel: null as null,
    role: "button",
    theme: "theme"
  };
  button: HTMLButtonElement

  componentDidMount() {
    if (this.props.autofocus) this.focus();
  }

  focus() {
    this.button.focus();
  }

  setRef = (button: HTMLButtonElement) => {
    this.button = button
  }

  render() {
    return (
      <button {...css(this.props.replacementCss ||
        [buttonStyle(this.props.theme, this.props.disabled),
        this.props.square && { borderRadius: 0 },
        this.props.flex && { flex: 1 },
        this.props.css])}
        title={this.props.title}
        onClick={this.props.action}
        tabIndex={this.props.tabIndex}
        aria-label={this.props.ariaLabel}
        role={this.props.role}
        disabled={this.props.disabled}
        className={this.props.testName}
        aria-haspopup={this.props.hasPopup}
        ref={this.setRef}>
        {this.props.children}
      </button>
    );
  }
}

export function buttonStyle(theme: string, disabled?: boolean) {
  if (theme === "transparent") return transparentStyle;
  if (theme === "link") return linkStyle;
  var fontColor: string;
  switch (theme) {
    case "white": fontColor = vars.color.fontLight; break;
    case "theme": fontColor = vars.color.whiteLight; break;
    default: fontColor = vars.color.white;
  }
  var backgroundColor = vars.color[theme];
  var hoverColor = vars.color[theme + 'Light'];
  if (disabled) {
    fontColor = vars.color.fontLight;
    backgroundColor = "#ddd";
    hoverColor = "#ddd";
  }

  const hover = {
    ':hover': {
      backgroundColor: hoverColor,
    }
  }

  return css({
    padding: `${vars.smallSpacing + 2}px ${vars.smallSpacing + 6}px`,
    textAlign: 'center',
    backgroundColor: backgroundColor,
    color: fontColor,
    userSelect: 'none',
    textDecoration: 'none',
    textTransform: 'capitalize',
    borderRadius: vars.border.borderRadius,
    border: 0,
    fontSize: 18,
    cursor: 'pointer',
    display: 'inline-block',
    ...hover,
    ':focus': {
      ...vars.focus[':focus'],
      backgroundColor: hoverColor,
    }
  });
}

const linkStyle = css({
  label: 'link-button-styling',
  display: 'inline-block',
  padding: 2, // You'll live to regret this, I think
  color: vars.color.themeLight,
  textDecoration: 'underline',
  cursor: 'pointer',

  ':hover': {
    color: vars.color.theme,

  }
});

const transparentStyle = css({
  label: 'transparent-button-style',
  padding: `${vars.smallSpacing + 1}px ${vars.smallSpacing + 6}px`,
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: `2px solid ${vars.color.whiteLight}`,
  color: vars.color.whiteLight,
  userSelect: 'none',
  textDecoration: 'none',
  textTransform: 'capitalize',
  borderRadius: vars.border.borderRadius,
  fontSize: 18,
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    color: vars.color.white,
    border: `2px solid ${vars.color.white}`,
  },
  ':focus': {
    ...vars.focus[':focus'],
  }
});
