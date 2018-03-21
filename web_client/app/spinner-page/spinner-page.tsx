import * as React from 'react';
import { Spinner } from 'spinner/spinner';
import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


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

