import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
const dashify = require('dashify') as (s: string) => string;
import { func } from 'prop-types';

// Components
import { Labelled } from 'forms/labelled/labelled';

// CSS
import { styles, vars, css } from 'styles/css';


export interface ShortInputProps {
  onChange(v: string): void
  label: string
  autofocus?: boolean
  errors?: string[]
  flex?: boolean
  inputRef?: (ref: HTMLInputElement) => void
  note?: string
  placeholder?: string
  required?: boolean
  type?: string
  value?: string
};

export class ShortInput extends React.Component<ShortInputProps, {}> {
  static contextTypes = {
    setActionContext: func,
    actionInContext: func
  }
  input: HTMLInputElement

  componentDidMount() {
    if (this.props.autofocus) this.focus();
  }

  focus() {
    this.input.focus();
  }

  render() {
    const { label, note, type, errors, value, required, flex } = this.props
    return (
      <Labelled {...{ errors, label, note, required, flex }}>
        <input {...css(style.input, errors && style.errorInput) }
          className={dashify(this.props.label)} // For testing purposes
          ref={r => {
            this.input = r;
            if (this.props.inputRef) {
              this.props.inputRef(r);
            }
          }}
          placeholder={this.props.placeholder}
          aria-invalid={!!errors}
          aria-required={required}
          type={type}
          value={value}
          onChange={(e: any) => this.props.onChange(e.target.value)} />
        <div {...style.icon}>{this.props.children}</div>
      </Labelled>
    );
  }
}

let style = styles({

  errorInput: {
    borderColor: vars.color.warn
  },
  input: {
    width: '100%',
    display: 'block',
    padding: vars.smallSpacing - 2,
    marginTop: vars.smallSpacing / 2 - 2,
    marginBottom: vars.smallSpacing / 2,
    fontSize: 16,
    ...vars.border,
    boxShadow: vars.shadow.insetBoxShadow,
    ...vars.inputFocus,
    '::-webkit-input-placeholder': {
      color: "#ddd"
    }
  },
  icon: {
    position: 'absolute',
    right: vars.smallSpacing,
    bottom: vars.smallSpacing - 2
  }
});
