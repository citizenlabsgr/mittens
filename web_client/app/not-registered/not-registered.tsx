import * as React from 'react';
import { observer } from 'mobx-react';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';
import { Link } from 'link/link';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';
import { addLeadingSlash } from 'history/PathUtils';
import { BigX } from 'icons/big-x';

export type NotRegisteredProps = {

};

@observer
export class NotRegistered extends React.Component<NotRegisteredProps, {}> {

  submit = () => {
    console.log("Go to registration instructions.");
  }

  render() {
    return (
      <MainContentWrapper background={vars.color.warnDark}>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <div {...style.icon}><BigX size={100} color={vars.color.white} /></div>
            <h1 {...style.result}>You&rsquo;re not registered.</h1>
            <p>Sorry! We couldn't find you using that information. You may not be registered. Find how to register yourself, or try checking again.</p>
            <div {...style.buttons}>
              <Link to="/registration-check" theme="transparent" css={style.button}>Try Again</Link>
              <Button action={this.submit} theme="warn" css={style.button}>Register to Vote</Button>
            </div>
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
  box: {
    padding: vars.spacing
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  },
});