interface Params {
  [id: string]: string
}

export interface MatchedRoute {
  route: Route,
  params: Params
}

export class Route {
  constructor(
    public path: string,
    public component: React.ComponentClass<any>,
    public queryParams: string[] = [],
    public preFilter: (r: Route) => boolean = () => false,
    public children: Route[] = []
  ) { }

  pathParts() {
    if (this.path === '/') return [''];
    return this.path.split('/');
  }

  match(remainingRouteParts: string[], incomingParams: Params = {}): MatchedRoute[] {
    const myParts = this.pathParts();
    const params = { ...incomingParams };
    for (var i = 0; i < myParts.length; i++) {
      let match = this.partMatch(myParts[i], remainingRouteParts[i]);
      if (!match) return;
      Object.assign(params, match);
    }
    // If we've gotten here, this path is a match; but there may still be
    // unmatched leftovers. Gotta find a child who matches.
    const nextRemainingRouteParts = remainingRouteParts.slice(myParts.length);
    const thisMatch = { route: this, params } as MatchedRoute;

    if (nextRemainingRouteParts.length === 0) {
      return [thisMatch];

      // If there are more parts, recurse!
    } else {
      const child = this.children.find(
        route => !!route.match(nextRemainingRouteParts, params)
      )
      if (!child) return;
      const childMatches = child.match(nextRemainingRouteParts, params)
      return [thisMatch].concat(childMatches)
    }
  }

  private partMatch(routePart: string, pathPart: string) {
    if (routePart === pathPart) {
      return {};
    } else if (routePart.startsWith(':')) {
      return { [routePart.slice(1)]: pathPart }
    } else {
      return false
    }
  }
}