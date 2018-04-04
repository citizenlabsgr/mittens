import * as React from 'react';
import { observer } from 'mobx-react';
import { go } from 'infrastructure/router';
import { Voter } from 'models';

import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';
import { Link } from 'components/link/link';

import { styles, vars, css, centeredBox } from 'styles/css';

import API from 'infrastructure/api/api';

export type LoginProps = {

};

@observer
export class Login extends React.Component<LoginProps, {}> {
  state = {
    ready: false,
    email: "",
    errors: null as {
      email: string[]
    }
  }

  componentWillMount() {
    Voter.fetchMe().then(voter => {
      if (voter.registered === true) {
        go('/registration-verified', {}, true);
      } else if (voter.registered === false) {
        go('/not-registered', {}, true);
      } else {
        go('/', {}, true);
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
    ).catch(
      () => this.setState({errors: {email: ["Sorry, I don't recognize that email"]}})
    )
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
              <ShortInput label="Email" autofocus onChange={this.setter('email')} errors={this.state.errors.email} value={this.state.email}/>
              <div {...style.buttons}>
                <Button action={this.submit}> Send me a link!</Button>
                <Link to='/' theme="secondary">I don't have an account</Link>
              </div>
            </form>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  box: {
    padding: vars.spacing
  },
  heading: {
    marginBottom: vars.spacing
  },
  maxWidth: {
    maxWidth: 600,
    margin: '0 auto'
  },
  note: {
    marginTop: vars.spacing,
    borderTop: vars.borderSimple,
    fontSize: 16
  },
});
