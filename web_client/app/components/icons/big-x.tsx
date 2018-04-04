import * as React from 'react';
import { observer } from 'mobx-react';


// CSS
import { styles, vars, css } from 'styles/css';


export type BigXProps = {
  spinning?: boolean,
  size: number,
  color: string
};

@observer
export class BigX extends React.Component<BigXProps, {}> {
  render() {
    const style = styler(this.props.size, this.props.color);
    return <div {...style.circleLoader} {...style.loadComplete}>
      <div {...style.bigX}>×</div>
    </div>
  }
}


const styler = (size: number, color: string) => {
  const checkHeight = size/2;
  const checkWidth = checkHeight/2;
  const checkLeft = size/3 - 2;
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

    bigX: {
      fontSize: 0.75 * size,
      color: color,
      left: checkLeft,
      top: 0,
      position: 'absolute',
    }
  });
}