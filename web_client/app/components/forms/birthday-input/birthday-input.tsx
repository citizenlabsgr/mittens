import * as React from 'react';

// Components
import { Labelled } from 'components/forms/labelled/labelled';
import { ShortInput } from 'components/forms/short-input/short-input';

// CSS
import { styles, vars, css } from 'styles/css';


export interface BirthdayInputProps {
  onChange(v: Date): void
  label: string
  autofocus?: boolean
  errors?: string[]
  note?: string
  required?: boolean
  value?: Date
};

export class BirthdayInput extends React.Component<BirthdayInputProps, {}> {
  state = {
    birthDay: undefined as number,
    birthMonth: 0 as number,
    birthYear: undefined as number,
  }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  setter(name: string) {
    return (value: any) => {
      this.setState({[name]: value}, () => this.onChange());
    }
  }

  birthDateAsDate() {
    const { birthDay, birthMonth, birthYear } = this.state;
    if (!birthDay || !birthYear) return;
    return new Date(birthYear, birthMonth, birthDay);
  }

  onChange() {
    this.props.onChange(this.birthDateAsDate());
  }

  render() {
    return (
      <div>
        <Labelled label={this.props.label} errors={this.props.errors && ["Your full birthday is required."]}>
        </Labelled>
        <div {...style.inline}>
          <select {...css(style.select, this.props.errors && style.errorInput)}
            autoFocus={this.props.autofocus}
            onChange={e => this.setter('birthMonth')(e.target.value)}
            value={this.state.birthMonth}>
            {this.months.map((name, i) => <option value={i} key={i}>{name}</option>)}
          </select>
          <ShortInput label=""
            errors={this.props.errors && this.props.errors.map(() => "")}
            onChange={this.setter('birthDay')}
            value={this.state.birthDay}
            placeholder="Day"
            type="number"
            autoComplete="bday-day" />
          <ShortInput label=""
            errors={this.props.errors && this.props.errors.map(() => "")}
            onChange={this.setter('birthYear')}
            value={this.state.birthYear}
            placeholder="Year"
            type="number"
            autoComplete="bday-year" />
        </div>
      </div>
    );
  }
}

let style = styles({
  inline: {
    display: 'flex',
    margin: `0px ${-vars.smallSpacing/2}px`,
    ' label': {
      margin: `0px ${vars.smallSpacing/2}px`
    }
  },
  errorInput: {
    borderColor: vars.color.warn
  },
  select: {
    width: '100%',
    display: 'block',
    height: 51,
    backgroundColor: vars.color.whiteTransparent,
    color: vars.color.white,
    padding: vars.smallSpacing,
    marginTop: vars.smallSpacing / 2,
    marginBottom: vars.smallSpacing / 2,
    marginRight: 6,
    marginLeft: 6,
    fontSize: vars.fontSize,
    ...vars.border,
    borderColor: 'transparent',
    boxShadow: 'none',
    ...vars.inputFocus,

    ' option': {
      backgroundColor: vars.color.theme
    }
  },

});




