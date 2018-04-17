import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
const dashify = require('dashify') as (s: string) => string;

// Components
import { Labelled } from 'components/forms/labelled/labelled';

// CSS
import { styles, vars, css } from 'styles/css';


export interface ShortInputProps {
  onChange(v: string|number): void
  label: string
  autofocus?: boolean
  errors?: string[]
  flex?: boolean
  note?: string
  placeholder?: string
  required?: boolean
  type?: string
  value?: string|number
  min?: number
  max?: number
  autoComplete?: string
};

export class ShortInput extends React.Component<ShortInputProps, {}> {
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.type === "number") {
      this.props.onChange(parseInt(e.target.value));
    } else {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    const { label, note, type, errors, value, required, flex, min, max } = this.props
    return (
      <Labelled {...{ errors, label, note, required, flex }}>
        <input {...css(style.input, errors && style.errorInput) }
          className={dashify(this.props.label)} // For testing purposes
          autoFocus={this.props.autofocus}
          autoComplete={this.props.autoComplete}
          placeholder={this.props.placeholder}
          aria-invalid={!!errors}
          aria-required={required}
          type={type}
          value={value || ""}
          min={min}
          max={max}
          onChange={this.onChange} />
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
    backgroundColor: vars.color.whiteTransparent,
    color: vars.color.white,
    padding: vars.smallSpacing,
    marginTop: vars.smallSpacing / 2,
    marginBottom: vars.smallSpacing / 2,
    fontSize: vars.fontSize,
    ...vars.border,
    borderColor: 'transparent',
    boxShadow: 'none',
    ...vars.inputFocus,
    '::-webkit-input-placeholder': {
      color: 'rgba(255,255,255,0.25)',
    }
  },
  icon: {
    position: 'absolute',
    right: vars.smallSpacing,
    bottom: vars.smallSpacing - 2
  }
});
