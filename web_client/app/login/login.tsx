import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { history, go } from 'router';

// Components
import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { Link } from 'link/link';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css } from 'styles/css';


export interface LoginProps { };

@observer
export class Login extends React.Component<LoginProps, {}> {
  state: {
    email: string
    password: string
    hasErrors: boolean
    errors: {
      general?: string[],
      email?: string[],
      password?: string[],
      full_messages?: string[]
    }
  } = {
    email: '',
    password: '',
    errors: {},
    hasErrors: false
  }

  login() {
    // User.login(this.state.email, this.state.password).then(() => {
    //   const state = history.location.state
    //   if (state && state.from) {
    //     // Redirect to where you were trying to get before we sent you to log in
    //     go(state.from.pathname, {
    //       query: state.from.search,
    //       state: state.from.state
    //     });
    //   } else {
    //     go('/home');
    //   }
    // }).catch((errors) => {
    //   this.setState({ hasErrors: true, errors: { general: errors } })
    // });
    console.log("FAKE LOGIN");
    go('/home');
  }

  setter(name: string) {
    return (value: any) => {
      this.setState({ [name]: value });
    }
  }

  errorsText() {
    const errors = this.state.errors;
    return <div {...css(vars.screenreaderOnly) } role="alert">
      {errors.general && errors.general.map((err, i) => <p key={i}>{err}</p>)}
      {errors.full_messages && errors.full_messages.map((err, i) => <p key={i}>{err}</p>)}
    </div>;
  }

  render() {
    const errors = this.state.errors;

    return (
      <MainContentWrapper>
        <div {...style.centeredBox} >
          {
            errors.general && <div {...style.errors}>
              {errors.general.map((err, i) => <span key={i}>{err}</span>)}
            </div>
          }
          {this.state.hasErrors && this.errorsText()}
          <ShortInput
            autofocus
            label="Email"
            type="email"
            onChange={this.setter('email')}
            value={this.state.email}
            errors={errors.email} />
          <ShortInput
            label="Password"
            type="password"
            onChange={this.setter('password')}
            value={this.state.password}
            errors={errors.password} />
          <div {...style.formButtonGroup}>
            <Button action={this.login} theme="success" flex>Log in</Button>
            <Link flex css={{ display: 'block', padding: '15px 0' }} to="/forgotten_password">Forgotten Password?</Link>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

let style = styles({
  errors: {
    color: vars.color.warn,
    fontSize: 14,
    float: 'right'
  },
  centeredBox: {
    position: 'relative',
    margin: `${vars.spacing}px auto`,
    maxWidth: 600,
    backgroundColor: vars.color.white,
    ...vars.border,
    padding: 25,
    ...vars.clearFix,
    '@media(min-width: 716px)': {
      padding: '50px 75px',
    }
  },
  formButtonGroup: {
    marginTop: 25,
    float: 'right',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    '@media(max-width: 500px)': {
      alignItems: 'stretch',
      flexDirection: 'column',
    }
  }
});
