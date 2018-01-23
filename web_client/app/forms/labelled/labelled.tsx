import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

// CSS
import { styles, vars, css } from 'styles/css';


export interface LabelledProps {
  label: string
  errors?: string[]
  flex?: boolean
  required?: boolean
  note?: string
};

export class Labelled extends React.Component<LabelledProps, {}> {
  render() {
    const { label, errors } = this.props
    return (
      <label {...css(style.label, this.props.flex && style.flex) }>
        <span {...style.labelText}>{label}
          {this.props.required && <span {...style.required} role="presentation" aria-hidden="true"> (required)</span>}
        </span>

        {errors && <div {...style.errors}>
          {errors.map((err, i) => <span key={i}>{!!i && "; "}{err}</span>)}
        </div>}

        {!errors && <div {...style.note}>
          {this.props.note}
        </div>}
        <div {...css({ clear: 'both' }) } />
        {this.props.children}
      </label>
    );
  }
}

let style = styles({
  label: {
    position: 'relative',
    display: 'block',
    marginBottom: vars.smallSpacing + 2,
    color: vars.color.white,
    fontSize: vars.fontSize
  },
  flex: {
    flex: 1,
    marginLeft: vars.spacing,
    ':first-of-type': {
      marginLeft: 0
    },
    '@media(max-width: 400px)': {
      flexBasis: '100%',
      width: '100%',
      marginLeft: 0
    }
  },
  labelText: {
    fontWeight: 600,
  },
  errors: {
    color: 'rgba(255, 220, 200, .9)',
    fontSize: 14,
    float: 'right',
    lineHeight: 1.6
  },
  note: {
    color: vars.color.fontLight,
    fontSize: 14,
    float: 'right',
    lineHeight: 1.6
  },
  required: {
    color: vars.color.theme,
    paddingLeft: 1,
  },
});