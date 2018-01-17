import * as React from 'react';
import { observer } from 'mobx-react';
import { go } from 'router';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { CheckMark } from 'icons/checkmark';

export type RegistrationVerifiedProps = {

};

@observer
export class RegistrationVerified extends React.Component<RegistrationVerifiedProps, {}> {
  state = {
    email: "",
    phoneNumber: "",
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  // Need to define action(s) associated with form buttons

  submit = () => {
    console.log('Email: ' + this.state.email);
    console.log('Phone Number: ' + this.state.phoneNumber);
  }

  return = () => {
    go('/registration-check')
  }

  render() {
    return (
      <MainContentWrapper background={vars.color.successDark}>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <div {...style.icon}>
              <CheckMark size={100} color={vars.color.white} />
            </div>
            <h1 {...style.result}>You&rsquo;re registered!</h1>
            <p>Sign up to be reminded to vote! Once you sign up, we can aslo help you encourage your friends to vote.</p>
            <ShortInput label="Email" onChange={this.setter('email')} value={this.state.email}/>
            <ShortInput label="Phone number" onChange={this.setter('phoneNumber')} value={this.state.phoneNumber}/>
            <div {...style.buttons}>
              <Button action={this.return} theme="transparent">Back</Button>
              <Button action={this.submit} theme="success">Sign Up</Button>
            </div>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
} 


const style = styles({
  icon: {
    margin: '0 auto',
    display: 'block',
    width: 100,
    marginBottom: 20
  },
  result: {
    textAlign: 'center',
  },
  buttons: {
    marginTop: vars.spacing,
    display: 'flex',
    justifyContent: 'space-between'
  },
  box: {
    padding: vars.spacing,
  },
  heading: {
    marginBottom: vars.spacing
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  },
});

