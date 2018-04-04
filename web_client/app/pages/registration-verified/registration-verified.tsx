import * as React from 'react';
import { observer } from 'mobx-react';
import { go } from 'infrastructure/router';
import { Voter } from 'models';

import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';
import { Link } from 'components/link/link';
import { CheckMark } from 'components/icons/checkmark';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';

export type RegistrationVerifiedProps = {};

@observer
export class RegistrationVerified extends React.Component<RegistrationVerifiedProps, {}> {
  state = {
    email: "",
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
      () => go("/awaiting-confirmation")
    ).catch(
      errors => this.setState({errors: errors})
    );
  }

  render() {
    return (
      <MainContentWrapper color="success">
        <div {...style.box}>
          <div {...style.maxWidth}>
            <div {...style.icon}>
              <CheckMark size={100} color={vars.color.white} />
            </div>
            <h1 {...style.result}>You&rsquo;re already registered&nbsp;to&nbsp;vote!</h1>
            {!Voter.currentUser.signedUp && <form onSubmit={e => { this.submit(); e.preventDefault(); }}>
              <p>Sign up to be reminded to vote in local elections.</p>
              <ShortInput label="Email" onChange={this.setter('email')} errors={this.state.errors.email} type="email" value={this.state.email}/>
              <div {...style.buttons}>
                <Link to="/registration-check" theme="secondary">Back</Link>
                <Button action={() => {}}>Sign Up</Button>
              </div>
            </form>}
            {Voter.currentUser.signedUp && <p>We'll remind you to get ready to vote before the next election.</p>}
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

