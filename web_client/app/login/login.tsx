import * as React from 'react';
import { observer } from 'mobx-react';
import { go } from 'router';
import { Voter } from 'models';

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
    ready: false,
    email: ""
  }

  componentWillMount() {
    Voter.fetchMe().then(voter => {
      if (voter.registered === true) {
        go('/registration-verified');
      } else if (voter.registered === false) {
        go('/not-registered');
      } else {
        go('/');
      }
    }).catch(e => {
      this.setState({errors: e, ready: true})
    })
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    const { email } = this.state;
    return API.post('login-email/', {email: email}).then(
      () => go("/awaiting-confirmation")
    );
  }

  render() {
    if (!this.state.ready) return null;

    return (
      <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <h1 {...style.heading}>Welcome Back!</h1>
            <p>Let us send you an email containing a link to get you back into to your account.</p>
            <form onSubmit={e => { this.submit(); e.preventDefault(); }}>
              <ShortInput label="Email" autofocus onChange={this.setter('email')} value={this.state.email}/>
              <Button action={this.submit} css={style.button}> Send me a link!</Button>
              <div {...style.note}><Link to='/'>I still need an account.</Link></div>
            </form>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  button: {
    marginLeft: 'auto',
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
  },
  note: {
    marginTop: vars.spacing,
    borderTop: vars.borderSimple,
    fontSize: 16
  },
});
