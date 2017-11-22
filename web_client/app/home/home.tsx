import * as React from 'react';
import { action } from 'mobx';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';


export type HomeProps = {

};


export class Home extends React.Component<HomeProps, {}> {
  state = {
    voterFirstName: "",
    voterLastName: "",
    voterBirthMonth: "",
    voterBirthYear: "",
    zip: ""
  } 

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit(){
    console.log("hooray!");
  }
  
  render() {
    return (
      <MainContentWrapper>
        <div {...css(style.box)}>
          <ShortInput label="First Name" onChange={this.setter('voterFirstName')} value={this.state.voterFirstName}/>
          <ShortInput label="Last Name" onChange={this.setter('voterLastName')} value={this.state.voterLastName}/>
          <ShortInput label="Birth Month" onChange={this.setter('voterBirthMonth')} value={this.state.voterBirthMonth}/>
          <ShortInput label="Birth Year" onChange={this.setter('voterBirthYear')} value={this.state.voterBirthYear}/>
          <ShortInput label="Zip Code" onChange={this.setter('zip')} value={this.state.zip}/>
          <Button action={this.submit}> FIND ME!</Button>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  box: {
    ...centeredBox,
    padding: vars.spacing
  }
});