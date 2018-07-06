import * as React from 'react';
import { styles, vars, css, keyframes } from 'styles/css';


export interface SpinnerProps {
  dark?: boolean
};

export class Spinner extends React.Component<SpinnerProps, {}> {
  render() {
    return <div {...style.uilEllipsis} style={{ transform: 'scale(0.49)' }}>
      <div {...style.ib}>
        <div {...css(style.circle, style.first) }>
          <div></div>
        </div><div {...css(style.circle, style.second, this.props.dark && style.dark) }>
          <div></div>
        </div>
        <div {...css(style.circle, style.third) }>
          <div></div>
        </div>
        <div {...css(style.circle, style.fourth, this.props.dark && style.dark) }>
          <div></div>
        </div>
      </div>
    </div>;
  }
}

const anim = keyframes({
  '0%': {
    transform: 'scale(0)',
    left: 0,
    opacity: 1
  },
  '12.5%': {
    transform: 'scale(1)',
  },
  '25%': {
    left: 0,
  },
  '37.5%': {
    left: 35,
  },
  '50%': {
    left: 35,
  },
  '62.5%': {
    left: 70,
  },
  '75%': {
    left: 70,
    transform: 'scale(1)',
  },
  '87.5%': {
    left: 70,
    transform: 'scale(0)',
    opacity: 1
  },
  '100%': {
    left: 70,
    opacity: 0
  }
});

let style = styles({
  uilEllipsis: {
    background: 'none',
    position: 'relative',
    width: 50,
    height: 70
  },
  ib: {
    width: '100%',
    height: '100%',
    transform: 'rotate(0deg)'
  },
  circle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 35,
    opacity: 0,
    textAlign: 'center',
    animation: `${anim} 4s linear infinite`,

    '> div': {
      width: 30,
      height: 30,
      borderRadius: 15,
      margin: 0,
    },
  },
  first: {
    animationDelay: '0s',
    '> div': {
      background: vars.color.themeSecondary
    }
  },
  second: {
    animationDelay: '1s',
    '> div': {
      background: vars.color.theme
    }
  },
  third: {
    animationDelay: '2s',
    '> div': {
      background: vars.color.themeSecondary
    }
  },
  fourth: {
    animationDelay: '3s',
    '> div': {
      background: vars.color.themeSecondary
    },
  },
  dark: {
    '> div': {
      background: vars.color.theme
    },
  }
});