import * as React from 'react';
import { observer } from 'mobx-react';
import { go, isActive, history } from 'infrastructure/router';
import { LocationDescriptor } from 'history';
import { css, styles, vars, Style } from 'styles/css';
import { buttonStyler } from 'components/button/button';

export interface LinkProps {
  to: string
  query?: { [id: string]: string }
  state?: any
  theme?: "primary" | "secondary" | "link"
  flex?: boolean
  square?: boolean
  css?: Style
  replacementCSS?: Style
  activeCSS?: Style
  replace?: boolean
  autofocus?: boolean
  tabIndex?: number
  role?: string
  beforeGo?: () => void
  target?: string
  title?: string
};

@observer
export class Link extends React.Component<LinkProps, {}> {
  static defaultProps = {
    theme: "link"
  };

  state: { active: false }
  link: HTMLAnchorElement
  newFocus = false
  unlisten: () => void;

  componentWillMount() {
    if (this.props.activeCSS) {
      const updateActive = () => {
        this.setState({
          active: isActive(this.props.to, {
            query: this.props.query,
            state: this.props.state
          })
        });
      }
      this.unlisten = history.listen(updateActive);
    }
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  go() {
    if (this.props.beforeGo) this.props.beforeGo();
    go(this.props.to, {
      query: this.props.query,
      state: this.props.state
    }, this.props.replace);
  }

  active() {
    return isActive(this.props.to, {
      query: this.props.query,
      state: this.props.state
    });
  }

  remoteLink() {
    return this.props.to.match(/\:\/\//);
  }

  onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.remoteLink()) return;
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    this.go();
    e.preventDefault();
  }

  render() {
    return <a
      ref={r => this.link = r}
      {...css(this.props.flex && { flex: 1 },
        style.reset,
        this.props.replacementCSS,
        !this.props.replacementCSS && [
        this.props.theme && buttonStyler(this.props.theme || "link"),
        this.props.square && { borderRadius: 0 },
        this.active() && this.props.activeCSS,
        this.props.css]) }
      tabIndex={this.props.tabIndex || 0}
      onClick={this.onClick}
      target={this.props.target}
      role={this.props.role}
      href={this.props.to}
      title={this.props.title}>
      {this.props.children}
    </a>;
  }
}

let style = styles({
  reset: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'inherit',
    ...vars.focus
  },
});
