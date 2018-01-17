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
      <div {...style.box}>
        <div {...style.maxWidth}>
          <div {...style.icon}>
            <CheckMark size={100} color={vars.color.white} />
          </div>
          <h1 {...style.result}>You&rsquo;re registered!</h1>
          <p {...style.note}>Sign up for notifications to be reminded to vote.  We'll automatically create an account you can use to encourage your friends to vote.</p>
          <ShortInput label="" onChange={this.setter('email')} placeholder="Email" value={this.state.email}/>
          <ShortInput label="" onChange={this.setter('phoneNumber')} placeholder="Phone Number" value={this.state.phoneNumber}/>
          <div><Button action={this.submit} theme="success" css={style.signUpButton}>Sign Up</Button></div>
          <Button action={this.return} theme="transparent" css={style.backButton}>Back</Button>
        </div>
      </div>
    );
  }
} 

// Colors from wireframe...
// Green form background: #6EB047
// Form input element background: #99C77E
// Button highlighted background and border: #85CE5A
// Text: #FFFFFF (white)

const style = styles({
  icon: {
    margin: '0 auto',
    display: 'block',
    width: 100,
    marginBottom: 20
  },
  result: {
    fontSize: '2.5em',
    margin: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {  
    padding: '10px'
  },
  signUpButton: {
    float: 'right'
  },
  backButton: {
    float: 'left'
  },
  box: {
    padding: vars.spacing,
    backgroundColor: '#6EB047'
  },
  heading: {
    marginBottom: vars.spacing
  },
  maxWidth: {
    maxWidth: 350,
    margin: '0 auto'
  },
});

