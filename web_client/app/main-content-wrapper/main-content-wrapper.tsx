import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

// CSS
import { styles, vars, css } from 'styles/css';


export interface MainContentWrapperProps {
  flex?: boolean
};

@observer
export class MainContentWrapper extends React.Component<MainContentWrapperProps, {}> {
  render() {
    return (
      <div {...style.wrapper}>
        <nav {...style.nav}>Nav</nav>
        <main {...css(style.content, this.props.flex && { display: 'flex' }) }>{this.props.children}</main>
        <footer {...style.footer} />
      </div>
    );
  }
}

let style = styles({
  nav: {
    backgroundColor: vars.color.theme,
    minHeight: 60
  },
  content: {
    flex: '1 0 auto',
    position: 'relative',
    backgroundColor: vars.color.background,
  },
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    backgroundColor: vars.color.theme,
    minHeight: 120
  }
});