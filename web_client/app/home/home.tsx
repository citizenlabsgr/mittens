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
    birthMonth: "",
    birthYear: "",
    zip: "",
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
    this.state.voter.checkRegistration(
      this.state.firstName,
      this.state.lastName,
      this.state.birthMonth,
      this.state.birthYear,
      this.state.zip
    )
  }
  
  render() {
    return (
      <MainContentWrapper>
        <div {...css(style.box)}>
          <ShortInput label="First Name" onChange={this.setter('firstName')} value={this.state.firstName}/>
          <ShortInput label="Last Name" onChange={this.setter('lastName')} value={this.state.lastName}/>
          <ShortInput label="Birth Month" onChange={this.setter('birthMonth')} value={this.state.birthMonth}/>
          <ShortInput label="Birth Year" onChange={this.setter('birthYear')} value={this.state.birthYear}/>
          <ShortInput label="Zip Code" onChange={this.setter('zip')} value={this.state.zip}/>
          <Button action={this.submit}> FIND ME!</Button>
        </div>
        { this.state.voter.registered && <div {...style.registered}>YOU IS ARE BE REGISTRATED.</div> }
        { (this.state.voter.registered === false) && <div {...style.notRegistered}>YOU IS NOT REGISTRATED.</div> }
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