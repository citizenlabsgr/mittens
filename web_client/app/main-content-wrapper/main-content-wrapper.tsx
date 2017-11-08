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
        <nav {...style.nav}>
          <div {...style.navMaxWidth}>
            <a href="/home">Voter Engagement</a>
          </div>
        </nav>
        <main {...css(style.content, this.props.flex && { display: 'flex' }) }>{this.props.children}</main>
        <footer {...style.footer} />
      </div>
    );
  }
}


let style = styles({
  nav: {
    backgroundColor: vars.color.theme,
    minHeight: 60,
  },
  navMaxWidth: {
    maxWidth: 900,
    margin: '0 auto',
    ' a': {
      display: 'inline-block',
      color: vars.color.white,
      fontWeight: 'bold',
      lineHeight: 0,
      padding: '30px',
      textDecoration: 'none',
      ':hover': {
        backgroundColor: vars.color.theme
      }
    }
  },
  content: {
    flex: '1 0 auto',
    position: 'relative',
    backgroundColor: vars.color.white,
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