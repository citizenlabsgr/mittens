import * as React from 'react';
import { vars, css, Style } from 'styles/css';
import { parent } from 'glamor';

export interface AnyButtonProps {
  tabIndex?: number
  css?: Style
  replacementCss?: Style
  autofocus?: boolean
  ariaLabel?: string | null
  title?: string
  role?: string
  theme?: "primary" | "secondary" | "link"
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
    theme: "primary"
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
        [buttonStyler(this.props.theme),
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

export function buttonStyler(theme: string) {
  return {
    primary: primaryStyle,
    secondary: secondaryStyle,
    link: linkStyle
  }[theme];
};

const buttonStyle = {
  padding: vars.smallSpacing - 2, // border
  textAlign: 'center',
  color: vars.color.white,
  userSelect: 'none',
  textDecoration: 'none',
  textTransform: 'capitalize',
  borderRadius: vars.border.borderRadius,
  border: 0,
  fontSize: 16,
  cursor: 'pointer',
  display: 'block',
  fontFamily: vars.fontFamily
};

const secondaryStyle = {
  ...buttonStyle,
  backgroundColor: "#aaa",
  ':hover': {
    backgroundColor: "#999",
  },
  ':active': {
    backgroundColor: "#aaa",
  },
}

const primaryStyle = css({
  ...buttonStyle,
  label: 'transparent-button-style',
  border: `2px solid rgba(255, 255, 255, .8)`,
  color: vars.color.blueDark,
  borderColor: vars.color.blue,
  backgroundColor: vars.color.blueLight,
  ':hover': {
    backgroundColor: vars.color.blueLightHover,
  },
  ':active': {
    backgroundColor: vars.color.blueLightHover,
  }
});


const linkStyle = css({
  label: 'link-styling',
  display: 'inline-block',
  padding: 2, // You'll live to regret this, I think
  color: vars.color.white,
  textDecoration: 'underline',
  cursor: 'pointer',
  ':hover': {
    color: 'rgba(255, 255, 255, .9)'
  },
  ':focus': {
    boxShadow: 'none',
    textShadow: `0 0 10px ${vars.color.focus}, 0 0 15px ${vars.color.focus}`
  }
});



