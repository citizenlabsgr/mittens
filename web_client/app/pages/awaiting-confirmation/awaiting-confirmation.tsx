import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'infrastructure/router';

import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'components/forms/short-input/short-input';
import { Button } from 'components/button/button';

// CSS
import { styles, vars, css } from 'styles/css';

export type AwaitingConfirmationProps = {};

@observer
export class AwaitingConfirmation extends React.Component<AwaitingConfirmationProps, {}> {
  render() {
    return (
      <MainContentWrapper color="theme">
        <h1>Thanks! Check your email!</h1>
        <p>We've sent you a link. Click it to log in.</p>
      </MainContentWrapper>
    );
  }
}

const style = styles({
});
