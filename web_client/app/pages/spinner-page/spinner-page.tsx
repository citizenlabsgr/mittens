import * as React from 'react';
import { Spinner } from 'components/spinner/spinner';
import { MainContentWrapper } from 'components/main-content-wrapper/main-content-wrapper';

// CSS
import { styles, vars, css } from 'styles/css';


export type SpinnerPageProps = {

};

export class SpinnerPage extends React.Component<SpinnerPageProps, {}> {
  render() {
    return (
      <MainContentWrapper>
        <Spinner />
      </MainContentWrapper>
    );
  }
}


const style = styles({

});

