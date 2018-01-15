import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';

export type RegistrationVerifiedProps = {

};

@observer
export class RegistrationVerified extends React.Component<RegistrationVerifiedProps, {}> {
  state = {
    email: "",
    phoneNumber: "",
  }

  // componentWillMount() {
  //   this.setState({voter: new Voter()});
  // }

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
    console.log("Go back to previous screen.");
  }

  render() {
    return (
      // <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <img {style.tempImage} src="http://www.slothwerks.com/citizen-labs/green-checkmark.jpg" alt="Checkmark"/>
            <p {style.result}>You're registered!</h1>
            <p {style.note}>Sign up for notifications to be reminded to vote.  We'll automatically create an account you can use to encourage your friends to vote.</p>
            <ShortInput label="" css={style.formInput} onChange={this.setter('email')} placeholder="Email" value={this.state.email}/>
            <ShortInput label="" css={style.formInput} onChange={this.setter('phoneNumber')} placeholder="Phone Number" value={this.state.phoneNumber}/>
            <div {style.buttonArea}>
              <Button action={this.return} css={style.button}> Back</Button>
              <Button action={this.submit} css={style.button}> Sign Up</Button>
            </div>
          </div>
        </div>
      // </MainContentWrapper>
    );
  }
} 

// Colors from wireframe...
// Green form background: #6EB047
// Form input element background: #99C77E
// Button highlighted background and border: #85CE5A
// Text: #FFFFFF (white)

const style = styles({
  tempImage: {
    margin: '0 auto',
    display: 'block',
    width: 108,
    height: 108,
    marginBottom: 20
  }
  result: {
    fontSize: '2.5em',
    margin: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  }
  note: {
    fontWeight: 'bold',    
    padding: '10px'
  }
  buttonArea: {
    display: 'flex',
    justifyContent: 'space-between'
  }
  button: {
    width: '45%',
    border: '2px solid #85CE5A',
    backgroundColor: 'transparent'
  }
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