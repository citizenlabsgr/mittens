import * as React from 'react';
import { action } from 'mobx';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { ShortInput } from 'forms/short-input/short-input';


export type HomeProps = {

};


export class Home extends React.Component<HomeProps, {}> {
  state = {
    voterName: "",
    zip: ""
  } 

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...css(style.box)}>
          <ShortInput label="Name" onChange={this.setter('voterName')} value={this.state.voterName}/>
          <ShortInput label="Zip Code" onChange={this.setter('zip')} value={this.state.zip}/>
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