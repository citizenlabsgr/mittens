import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'router';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


export type RegistrationCheckProps = {

};

@observer
export class RegistrationCheck extends React.Component<RegistrationCheckProps, {}> {
  state = {
    firstName: "",
    lastName: "",
    birthDate: "",
    zipCode: "",
    voter: null as Voter
  }

  componentWillMount() {
    this.setState({voter: new Voter()});
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    const { voter, firstName, lastName, birthDate, zipCode } = this.state;
    Object.assign(voter, { firstName, lastName, birthDate, zipCode });
    voter.checkRegistration().then(r => {
      if (r) {
        go('/registration-verified');
      } else {
        go('/not-registered');
      }
    })
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <h1 {...style.heading}>First, let's check if you&rsquo;re registered to vote.</h1>
            <ShortInput label="First Name" onChange={this.setter('firstName')} value={this.state.firstName}/>
            <ShortInput label="Last Name" onChange={this.setter('lastName')} value={this.state.lastName}/>
            <ShortInput label="Birthday" onChange={this.setter('birthDate')} value={this.state.birthDate} placeholder="YYYY-MM-DD" />
            <ShortInput label="Zip Code" onChange={this.setter('zipCode')} value={this.state.zipCode}/>
            <div {...css(vars.clearFix)}><Button action={this.submit} css={style.button}>Check!</Button></div>
            <div {...style.note}><p>You can also use the <a href="">Secretary of State's website</a></p></div>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  heading: {
    textAlign: 'center'
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
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  }
});
