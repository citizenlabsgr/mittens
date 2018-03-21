import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'router';

import { Link } from 'link/link';
import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';
import { Labelled } from 'forms/labelled/labelled';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


export type RegistrationCheckProps = {

};

@observer
export class RegistrationCheck extends React.Component<RegistrationCheckProps, {}> {
  state = {
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: 0 as number,
    birthYear: "",
    zipCode: "",
    errors: {} as {
      first_name: string[],
      last_name: string[],
      zip_code: string[],
      birth_date: string[]
    }
  }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  setter(name: string) {
    return (value: any) => {
      this.setState({[name]: value});
    }
  }

  birthDateAsDate() {
    const { birthDay, birthMonth, birthYear } = this.state;
    return new Date(parseInt(birthYear), birthMonth, parseInt(birthDay));
  }

  submit = () => {
    this.setState({errors: {}});

    const { firstName, lastName, zipCode } = this.state;
    const birthDate = this.birthDateAsDate();
    const voter = Voter.currentUser;
    Object.assign(voter, { firstName, lastName, birthDate, zipCode });

    voter.checkRegistration().then(r => {
      if (r) {
        go('/registration-verified');
      } else {
        go('/not-registered');
      }
    }).catch(e => {
      this.setState({errors: e})
    })
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...style.box}>
          <form {...style.maxWidth} onSubmit={e => { this.submit(); e.preventDefault(); }}>
            <h1 {...style.heading}>First, let's check if you&rsquo;re registered to vote.</h1>

            <ShortInput label="First Name"
              onChange={this.setter('firstName')}
              errors={this.state.errors.first_name}
              value={this.state.firstName}
              autoComplete="given-name" />

            <ShortInput label="Last Name"
              onChange={this.setter('lastName')}
              errors={this.state.errors.last_name}
              value={this.state.lastName}
              autoComplete="family-name" />

            <Labelled label="Birth Date">
              <div {...style.inline}>
                <select {...style.select}
                  onChange={e => this.setter('birthMonth')(e.target.value)}
                  value={this.state.birthMonth}>
                  {this.months.map((name, i) => <option value={i} key={i}>{name}</option>)}
                </select>
                <ShortInput label=""
                  onChange={this.setter('birthDay')}
                  value={this.state.birthDay}
                  placeholder="Day"
                  type="number"
                  autoComplete="bday-day" />
                <ShortInput label=""
                  onChange={this.setter('birthYear')}
                  value={this.state.birthYear}
                  placeholder="Year"
                  type="number"
                  autoComplete="bday-year" />
              </div>
            </Labelled>

            <ShortInput label="Zip Code"
              onChange={this.setter('zipCode')}
              errors={this.state.errors.zip_code}
              value={this.state.zipCode}
              autoComplete="postal-code" />

            <div {...css(vars.clearFix)}>
              <Button action={this.submit} css={style.button}>Check!</Button>
            </div>

            <div {...style.note}>
              <p>You can also use the <a href="https://webapps.sos.state.mi.us/MVIC/">Secretary of State's website</a></p>
              <p>Already signed up? <Link to="/login">Log in</Link></p>
            </div>
          </form>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  heading: {
    textAlign: 'center',
    marginBottom: vars.spacing
  },
  button: {
    float: 'right',
    marginTop: vars.smallSpacing
  },
  note: {
    marginTop: vars.spacing,
    borderTop: vars.borderSimple,
    fontSize: 16
  },
  box: {
    padding: vars.spacing
  },
  inline: {
    display: 'flex',
    margin: `0px ${-vars.smallSpacing/2}px`,
    ' label': {
      margin: `0px ${vars.smallSpacing/2}px`
    }
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
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  }
});
