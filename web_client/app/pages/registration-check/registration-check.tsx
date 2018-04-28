import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'infrastructure/router';

import { Link } from 'components/link/link';
import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';
import { Labelled } from 'components/forms/labelled/labelled';
import { BirthdayInput } from 'components/forms/birthday-input/birthday-input';

// CSS
import { styles, vars, css } from 'styles/css';
import { MittensChat } from 'models/mittens-chat/mittens-chat';


export type RegistrationCheckProps = {

};

@observer
export class RegistrationCheck extends React.Component<RegistrationCheckProps, {}> {
  state = {
    firstName: "",
    lastName: "",
    zipCode: "",
    birthDate: undefined as Date,
    errors: {} as {
      first_name: string[],
      last_name: string[],
      zip_code: string[],
      birth_date: string[]
    }
  }

  setter(name: string) {
    return (value: any) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    this.setState({errors: {}});

    const { firstName, lastName, zipCode, birthDate } = this.state;
    const voter = Voter.currentUser;
    Object.assign(voter, { firstName, lastName, birthDate, zipCode });

    voter.checkRegistration().then(r => {
      console.log("here");
      console.log(voter.registrationInputData())
      MittensChat.handleUserInput(voter.registrationInputData(), r)
    }).catch(e => {
      this.setState({errors: e})
    })
  }

  render() {
    return (
          <form onSubmit={e => { e.preventDefault(); this.submit(); }}>
            <ShortInput label="First Name"
              onChange={this.setter('firstName')}
              errors={this.state.errors.first_name}
              value={this.state.firstName}
              autoComplete="given-name" />

            <ShortInput label="Last Name"
              onChange={this.setter('lastName')}
              errors={this.state.errors.last_name}
              value={this.state.lastName}
              autoComplete="family-name" />

            <BirthdayInput label="Birth Date"
              onChange={this.setter('birthDate')}
              errors={this.state.errors.birth_date}
              value={this.state.birthDate} />

            <ShortInput label="Zip Code"
              onChange={this.setter('zipCode')}
              errors={this.state.errors.zip_code}
              value={this.state.zipCode}
              autoComplete="postal-code" />

            <div {...css(vars.clearFix)}>
              <Button theme="secondary" action={() => {}} css={style.button}>Done!</Button>
            </div>
          </form>
    );
  }
}

const style = styles({
  heading: {
    textAlign: 'center',
    marginBottom: vars.spacing
  },
  button: {
    float: 'right',
    marginTop: vars.smallSpacing
  },
  note: {
    marginTop: vars.spacing,
    borderTop: vars.borderSimple,
    fontSize: 16
  }
});
