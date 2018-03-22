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
    birthMonth: "",
    birthYear: "",
    zipCode: "",
    errors: {} as {
      first_name: string[],
      last_name: string[],
      zip_code: string[],
      birth_date: string[]
    }
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {   
    const { firstName, lastName, birthDay, birthMonth, birthYear, zipCode } = this.state;
    const voter = Voter.currentUser;
    const birthMonthNum = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].indexOf(birthMonth.toLowerCase());
    if (birthMonthNum === -1) {
      // temporary alert, replace with form error state/form validation function
      alert('Please enter a valid month.');
      return;
    };
    const birthDate = new Date(parseInt(birthYear), birthMonthNum, parseInt(birthDay));
    this.setState({errors: {}});
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
            <ShortInput label="First Name" onChange={this.setter('firstName')} errors={this.state.errors.first_name} value={this.state.firstName}/>
            <ShortInput label="Last Name" onChange={this.setter('lastName')} errors={this.state.errors.last_name} value={this.state.lastName}/>
            <Labelled label="Birth Date">
              <div {...style.inline}>
                <div {...style.monthInput}>
                  <ShortInput label="" onChange={this.setter('birthMonth')} value={this.state.birthMonth} placeholder="Month" />
                </div>
                <ShortInput label="" onChange={this.setter('birthDay')} value={this.state.birthDay} placeholder="Day" type="number"/>
                <ShortInput label="" onChange={this.setter('birthYear')} value={this.state.birthYear} placeholder="Year" type="number"/>
              </div>
            </Labelled>
            <ShortInput label="Zip Code" onChange={this.setter('zipCode')} errors={this.state.errors.zip_code} value={this.state.zipCode}/>
            <div {...css(vars.clearFix)}><Button action={this.submit} css={style.button}>Check!</Button></div>
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
  monthInput: {
      minWidth: 120
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  }
});
