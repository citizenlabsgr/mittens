import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'infrastructure/router';

import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';
import { Link } from 'components/link/link';
import { BigX } from 'components/icons/big-x';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { addLeadingSlash } from 'history/PathUtils';


export type NotRegisteredProps = {

};

@observer
export class NotRegistered extends React.Component<NotRegisteredProps, {}> {
  state = {
    email: "",
    awaitingConfirmation: false,
    errors: {} as {
      email: string[]
    }
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  // Need to define action(s) associated with form buttons

  submit = () => {
    Voter.currentUser.email = this.state.email;
    Voter.currentUser.signUp().then(
      () => go('/awaiting-confirmation')
    ).catch(
      errors => this.setState({errors: errors})
    );
  }

  register = () => {
    alert("Not implemented.")
  }

  render() {
    return (
      <MainContentWrapper color="warn">
        <div {...style.box}>
          <div {...style.maxWidth}>
            <div {...style.icon}><BigX size={100} color={vars.color.white} /></div>
            <h1 {...style.result}>You&rsquo;re not registered.</h1>
            <p>Sorry! We couldn't find you using that information. You may not be registered. Find how to register yourself, or <Link to="/registration-check">try checking again</Link>.</p>
            <div {...style.registerButtons}>
              <Button action={this.register} css={style.button}>Register to Vote</Button>
            </div>
            {!Voter.currentUser.signedUp && <form onSubmit={e => { this.submit(); e.preventDefault(); }}>
              <p>You can also sign up to be reminded to vote in local elections.</p>
              <ShortInput label="Email" onChange={this.setter('email')} errors={this.state.errors.email} type="email" value={this.state.email}/>
              <div {...style.buttons}>
                <Link to="/registration-check" theme="secondary">Back</Link>
                <Button action={this.submit}>Sign Up</Button>
              </div>
            </form>}
            {Voter.currentUser.signedUp && <form onSubmit={e => { this.submit(); e.preventDefault(); }}>
              <p>We'll email you to remind you about upcoming elections.</p>
            </form>}
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  icon: {
    margin: '0 auto',
    width: 100,
    marginBottom:vars.spacing
  },
  result: {
    textAlign: 'center',
  },
  button: {
    marginBottom: vars.spacing
  },
  buttons: {
    marginTop: vars.spacing * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  registerButtons: {
    marginTop: vars.spacing * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  box: {
    padding: vars.spacing
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  },
});