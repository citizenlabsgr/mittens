import * as React from 'react';
import { history } from './history';
import { LocationDescriptorObject, Location } from 'history';
import { Route, MatchedRoute } from './route';
export { Route } from './route';

export class DumbComponent extends React.Component<{}, {}> {
  render() {
    return React.Children.only(this.props.children);
  }
}

export interface RouteDeclaration {
  path: string
  component?: React.ComponentClass<any>
  queryParams?: string[]
  children?: RouteDeclaration[]
  preFilter?: (r: Route) => boolean
}

export interface RouterProps {
  routes: RouteDeclaration
  notFound: JSX.Element
};

export class Router extends React.Component<RouterProps, {}> {
  state: {
    currentRoute?: MatchedRoute[]
    routes: Route
  }

  stopListening: () => void

  buildRoutes(route: RouteDeclaration): Route {
    var children: Route[] = [];
    if (route.children) {
      children = route.children.map(r => this.buildRoutes(r));
    }
    return new Route(
      route.path,
      route.component || DumbComponent,
      route.queryParams,
      route.preFilter,
      children,
    );
  }

  constructor(props: RouterProps, context: any) {
    super(props, context)
    // Initial set hasta be synchronous or matchedRoute won't know what routes
    // there are.
    this.state = { routes: this.buildRoutes(props.routes) };
  }

  componentWillMount() {
    this.stopListening = history.listen(this.updateRoute);
    this.updateRoutes(this.props.routes);
  }

  updateRoutes(routeDecs: RouteDeclaration) {
    this.setState({ routes: this.buildRoutes(routeDecs) });
    this.updateRoute(history.location);
  }

  updateRoute = (location: Location) => {
    const matches = this.matchedRoute(location);
    if (!matches) {
      this.setState({ currentRoute: null })
    } else {
      const redirect = matches.find(m => m.route.preFilter(m.route));
      if (redirect) return;
      this.setState({ currentRoute: matches });
    }
  };

  componentWillUnmount() {
    this.stopListening();
  }

  matchedRoute(location: LocationDescriptorObject, routes?: Route) {
    routes = routes || this.state.routes;
    const parts = location.pathname.split('/');
    const matches = routes.match(parts);
    if (!matches || !matches.length) return null;
    return matches;
  }

  // Mostly useful for HMR; routes shouldn't change in prod.
  componentWillReceiveProps(newProps: RouterProps) {
    this.updateRoutes(newProps.routes);
  }

  renderMatchedRoute(matches: MatchedRoute[]): JSX.Element {
    if (matches.length === 0) return;
    const match = matches[0];
    return React.createElement(match.route.component, {
      ...match.params,
      children: this.renderMatchedRoute(matches.slice(1))
    })
  }

  render() {
    const matches = this.state.currentRoute;
    if (!matches) return this.props.notFound;
    const match = matches[0];
    return React.createElement(match.route.component, {
      ...match.params,
      children: this.renderMatchedRoute(matches.slice(1))
    })
  }
}