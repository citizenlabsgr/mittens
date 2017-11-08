import * as React from 'react';
import { action } from 'mobx';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


export type HomeProps = {

};


export class Home extends React.Component<HomeProps, {}> {
  state: {
  } 

  render() {
    return (
      <MainContentWrapper>
        <div {...css(style.box)}>
          Hello, world!
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