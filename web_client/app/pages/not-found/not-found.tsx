import * as React from 'react';

import { Link } from 'components/link/link';

// CSS
import { styles, vars, css } from 'styles/css';
import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';


export interface NotFoundProps {

};


export class NotFound extends React.Component<NotFoundProps, {}> {
  render() {
    return (
      <MainContentWrapper>
        <p>Sorry, that page does not exist. <Link replace to="/">Return home</Link>.</p>
      </MainContentWrapper>
    );
  }
}

let style = styles({
});