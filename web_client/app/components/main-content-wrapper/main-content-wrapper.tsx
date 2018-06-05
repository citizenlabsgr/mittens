import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'components/link/link';

// CSS
import { styles, vars, css } from 'styles/css';


export interface MainContentWrapperProps {
  color?: "theme" | "success" | "warn"
};

@observer
export class MainContentWrapper extends React.Component<MainContentWrapperProps, {}> {
  static defaultProps = {
    color: "theme"
  }

  render() {
    return (
      <div>
        <div {...style.wrapper} className={this.props.color + "-container"} style={{backgroundColor: vars.color[this.props.color]}}>
          <main {...style.content}>{this.props.children}</main>
          <div {...style.githubLink}>
            <Link to="https://github.com/citizenlabsgr/voter-engagement" target="_blank">View On GitHub</Link>
          </div>
        </div>
      </div>
    );
  }
}


let style = styles({
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vars.spacing
  },
  content: {
    position: 'relative',
    maxWidth: 525
  },
  githubLink: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
