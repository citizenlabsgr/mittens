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
    left: 70,
  },
  '50%': {
    left: 70,
  },
  '62.5%': {
    left: 140,
  },
  '75%': {
    left: 140,
    transform: 'scale(1)',
  },
  '87.5%': {
    left: 140,
    transform: 'scale(0)',
    opacity: 1
  },
  '100%': {
    left: 140,
    opacity: 0
  }
});

let style = styles({
  uilEllipsis: {
    background: 'none',
    position: 'relative',
    width: 200,
    height: 200,
    margin: '0 auto',
  },
  ib: {
    width: '100%',
    height: '100%',
    transform: 'rotate(0deg)'
  },
  circle: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 70,
    opacity: 0,
    textAlign: 'center',
    animation: `${anim} 4s linear infinite`,

    '> div': {
      width: 60,
      height: 60,
      borderRadius: 30,
      margin: 0,
    },
  },
  first: {
    animationDelay: '0s',
    '> div': {
      background: vars.color.themeLight
    }
  },
  second: {
    animationDelay: '1s',
    '> div': {
      background: vars.color.background
    }
  },
  third: {
    animationDelay: '2s',
    '> div': {
      background: vars.color.themeLight
    }
  },
  fourth: {
    animationDelay: '3s',
    '> div': {
      background: vars.color.background
    },
  },
  dark: {
    '> div': {
      background: vars.color.theme
    },
  }
});