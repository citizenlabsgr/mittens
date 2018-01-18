import * as React from 'react';
import { observer } from 'mobx-react';
import { go } from 'router';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';
import { Link } from 'link/link';

import { styles, vars, css, centeredBox } from 'styles/css';

import API from 'api/api';

export type LoginProps = {

};

@observer
export class Login extends React.Component<LoginProps, {}> {
  state = {
    email: "",
    errors: {} as {
      email: string[],
    }
  }

  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    API.get('registration/').then(data => {
      const registered = data['registered'];
      console.log("Registered: " + registered);
      if (registered === true) {
        go('/registration-verified');
      } else if (registered === false) {
        go('/not-registered');
      } else {
        go('/');
      }
    }).catch(e => {
      this.setState({errors: e})
    })
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    const { email } = this.state;
    console.log("Sending email: " + email);
    return API.post('login-email/', {email: email});
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <h1 {...style.heading}>Welcome Back!</h1>
            <p>Let us send you an email containing a link to get you back into to your account.</p>
            <ShortInput label="Email" onChange={this.setter('email')} placeholder="you@yourdomain.com" value={this.state.email}/>
            <Button action={this.submit} css={style.button}> Send me a link!</Button>
            <Link to='/'>I still need an account.</Link>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  button: {
    margin: '0 auto',
    display: 'block'
  },
  box: {
    padding: vars.spacing
  },
  heading: {
    marginBottom: vars.spacing
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  }
});
