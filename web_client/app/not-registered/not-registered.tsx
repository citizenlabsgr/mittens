import * as React from 'react';
import { observer } from 'mobx-react';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { addLeadingSlash } from 'history/PathUtils';

export type NotRegisteredProps = {

};

@observer
export class NotRegistered extends React.Component<NotRegisteredProps, {}> {

  // Need to define action(s) associated with form buttons

  submit = () => {
    console.log("Go to registration instructions.");
  }

  return = () => {
    console.log("Go back to previous screen.");
  }

  render() {
    return (
      <div {...style.box}>
        <div {...style.maxWidth}>
          <img {...style.tempImage} src="http://www.slothwerks.com/citizen-labs/orange-x.jpg" alt="X"/>
          <h1 {...style.result}>You're not registered.</h1>
          <p>Find how to register near you.</p>
          <Button action={this.submit} css={style.howToRegisterButton}>How to Register</Button>
          <Button action={this.return} css={style.backButton}>Back</Button>
        </div>
      </div>
    );
  }
} 

// Colors from wireframe...
// Orange form background: #F17B26
// Button highlighted background and border: #F5A623
// Text: #FFFFFF (white)

const style = styles({
  tempImage: {
    margin: '0 auto',
    display: 'block',
    width: 108,
    height: 108,
    marginBottom: 20
  },
  result: {
    fontSize: '2.5em',
    margin: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {
    fontWeight: 'bold',    
    padding: '10px'
  },
  howToRegisterButton: {
    width: '60%',
    margin: '0 auto',
    display: 'block',
    backgroundColor: '#F5A623',
    marginBottom: 200,
    fontWeight: 'bold',
  },
  backButton: {
    width: '45%',
    border: '2px solid #F5A623',
    backgroundColor: 'transparent',
    display: 'inline-block',
    float: 'left',
    fontWeight: 'bold',
  },
  box: {
    padding: vars.spacing,
    backgroundColor: '#F17B26'
  },
  heading: {
    marginBottom: vars.spacing
  },
  maxWidth: {
    maxWidth: 350,
    margin: '0 auto'
  },
});