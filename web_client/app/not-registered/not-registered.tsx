import * as React from 'react';
import { observer } from 'mobx-react';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { addLeadingSlash } from 'history/PathUtils';
import { BigX } from 'icons/big-x';

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
          <div {...style.icon}><BigX size={100} color={vars.color.white} /></div>
          <h1 {...style.result}>You're not registered.</h1>
          <p>We couldn't find you using that information; you may not be registered. Find how to register near you, or try checking again.</p>
          <div {...style.buttons}><Button action={this.submit} theme="warn" css={style.button}>Register to Vote</Button>
          <Button action={this.return} theme="transparent" css={style.button}>Try Again</Button>
          </div>
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
  icon: {
    margin: '0 auto',
    width: 100,
    marginBottom:vars.spacing
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
  button: {
    marginBottom: vars.spacing
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
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