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
      <div {...style.wrapper} className={this.props.color + "-container"} style={{backgroundColor: vars.color[this.props.color]}}>
        <main {...style.content}>{this.props.children}</main>
        <div>
          <span {...style.githubLink}><Link to="https://github.com/citizenlabsgr/voter-engagement">View On GitHub</Link></span>
        </div>
      </div>
    );
  }
}


let style = styles({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  githubLink: {
    marginBottom: '10px',
    marginRight: '35px',
    fontSize: '15px',
    float: 'right',
  },
});
