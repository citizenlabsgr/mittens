import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


export type HomeProps = {

};

@observer
export class Home extends React.Component<HomeProps, {}> {
  state = {
    firstName: "",
    lastName: "",
    birthDate: "",
    zipCode: "",
    voter: null as Voter
  } 

  componentWillMount() {
    this.setState({voter: new Voter()});
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    const { voter, firstName, lastName, birthDate, zipCode } = this.state;
    Object.assign(voter, { firstName, lastName, birthDate, zipCode });
    voter.checkRegistration();
  }
  
  render() {
    return (
      <MainContentWrapper>
        <div {...css(style.box)}>
          <ShortInput label="First Name" onChange={this.setter('firstName')} value={this.state.firstName}/>
          <ShortInput label="Last Name" onChange={this.setter('lastName')} value={this.state.lastName}/>
          <ShortInput label="Birthday" onChange={this.setter('birthDate')} value={this.state.birthDate} placeholder="YYYY-MM-DD" />
          <ShortInput label="Zip Code" onChange={this.setter('zipCode')} value={this.state.zipCode}/>
          <Button action={this.submit}> FIND ME!</Button>
        </div>
        { this.state.voter.registered && <div {...style.registered}>YOU ARE REGISTERED.</div> }
        { (this.state.voter.registered === false) && <div {...style.notRegistered}>YOU ARE NOT REGISTERED.</div> }
      </MainContentWrapper>
    );
  }
}

const style = styles({
  box: {
    ...centeredBox,
    padding: vars.spacing
  },
  registered: {
    ...centeredBox,
    padding: vars.spacing,
    backgroundColor: vars.color.theme,
    color: vars.color.white
  },
  notRegistered: {
    ...centeredBox,
    padding: vars.spacing,
    backgroundColor: vars.color.warn,
    color: vars.color.white
  }
});