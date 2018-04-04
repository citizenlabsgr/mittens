import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'router';

import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';

export type AwaitingConfirmationProps = {};

@observer
export class AwaitingConfirmation extends React.Component<AwaitingConfirmationProps, {}> {
  render() {
    return (
      <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <h1>Thanks! Check your email!</h1>
            <p>We've sent you a link. Click it to log in.</p>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  box: {
    padding: vars.spacing
  },
  maxWidth: {
    textAlign: 'center',
    maxWidth: 400,
    margin: '0 auto'
  },
});
