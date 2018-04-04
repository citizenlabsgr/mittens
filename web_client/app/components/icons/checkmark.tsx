import * as React from 'react';
import { observer } from 'mobx-react';


// CSS
import { styles, vars, css } from 'styles/css';


export type CheckMarkProps = {
  spinning?: boolean,
  size: number,
  color: string
};

@observer
export class CheckMark extends React.Component<CheckMarkProps, {}> {
  render() {
    const style = styler(this.props.size, this.props.color);
    return <div {...style.circleLoader} {...style.loadComplete}>
      <div {...style.checkmark}></div>
    </div>
  }
}


const styler = (size: number, color: string) => {
  const checkHeight = size/2;
  const checkWidth = checkHeight/2;
  const checkLeft = (size/6 + size/12);
  const checkThickness = 2;

  return styles({
    circleLoader: {
      position: 'relative',
      border: '2px solid rgba(0, 0, 0, 0.2)',
      borderLeftColor: color,
      display: 'inline-block',
      verticalAlign: 'top',
      borderRadius: '50%',
      width: size,
      height: size,
      ':after': {
        borderRadius: '50%',
        width: size,
        height: size,
      }
    },

    loadComplete: {
      borderColor: color,
      transition: 'border 500ms ease-out'
    },

    checkmark: {
      transform: 'scaleX(-1) rotate(135deg)',
      opacity: 1,
      height: checkHeight,
      width: checkWidth,
      transformOrigin: 'left top',
      borderRight: `2px solid ${color}`,
      borderTop: `2px solid ${color}`,
      content: '""',
      left: checkLeft,
      top: checkHeight,
      position: 'absolute',
    }
  });
}