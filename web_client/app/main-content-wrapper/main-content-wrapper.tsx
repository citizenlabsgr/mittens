import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

// CSS
import { styles, vars, css } from 'styles/css';


export interface MainContentWrapperProps {
  background?: string
};

@observer
export class MainContentWrapper extends React.Component<MainContentWrapperProps, {}> {
  render() {
    return (
      <div {...style.wrapper} style={{backgroundColor: this.props.background || vars.color.background}}>
        <main {...style.content}>{this.props.children}</main>
      </div>
    );
  }
}


let style = styles({
  content: {
    flex: 1,
    position: 'relative'
  },
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center'
  }
});
