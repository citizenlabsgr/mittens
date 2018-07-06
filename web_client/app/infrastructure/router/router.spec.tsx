import * as React from 'react';
import { Route } from './router';
import { go, history } from '../router';

class MyComponent extends React.Component<{}, {}> {
  render() {
    return <div />;
  }
}

describe("Route", () => {
  describe("match", () => {
    it("Returns a list when a simple match", () => {
      const route = new Route('/aPath', MyComponent);
      const match = route.match(['', 'aPath']);
      expect(match).toBeTruthy();
      expect(match.length).toBe(1);
      expect(match[0].params).toEqual({});
      expect(match[0].route).toBe(route);
    });

    it("Returns false when no match", () => {
      const route = new Route('/aPath', MyComponent);
      const match = route.match(['', 'apooth']);
      expect(match).toBeFalsy();
    });

    it("Matches when there are multiple segments in path", () => {
      const route = new Route('/aPath/morePath', MyComponent);
      const match = route.match(['', 'aPath', 'morePath']);
      expect(match).toBeTruthy();
    });

    it("Matches when there are children", () => {
      const route = new Route('/aPath', MyComponent, [], () => false, [
        new Route('morePath', MyComponent)
      ]);
      const match = route.match(['', 'aPath', 'morePath']);
      expect(match).toBeTruthy();
      expect(match.length).toBe(2);
      expect(match[0].params).toEqual({});
      expect(match[0].route).toBe(route);

      expect(match[1].params).toEqual({});
      expect(match[1].route).toBe(route.children[0]);
    });

    it("Matches when there are params", () => {
      const route = new Route('/aPath/:figID', MyComponent);
      const match = route.match(['', 'aPath', '5']);
      expect(match).toBeTruthy();
      expect(match[0].params).toEqual({ figID: '5' });
    });

    it("Matches when there are nested route params", () => {
      const route = new Route('/aPath/:figID', MyComponent, [], () => false, [
        new Route('morePath/:moreID/:yoreID', MyComponent)
      ]);
      const match = route.match(['', 'aPath', '5', 'morePath', '3', '7']);
      expect(match).toBeTruthy();
      expect(match[0].params).toEqual({ figID: '5' });
      expect(match[1].params).toEqual({ figID: '5', moreID: '3', yoreID: '7' });
    });
  });

  describe("go", () => {
    beforeEach(() => {
      go("/one/two/three");
    })

    it("Handles absolute urls", () => {
      go("/fig/bar");
      expect(history.location.pathname).toEqual("/fig/bar");
    });

    it("Handles relative urls", () => {
      go("four");
      expect(history.location.pathname).toEqual("/one/two/four");
    });

    it("Handles single-dotted relative urls", () => {
      go("./four");
      expect(history.location.pathname).toEqual("/one/two/four");
    });

    it("Handles double-dotted relative urls", () => {
      go("../four");
      expect(history.location.pathname).toEqual("/one/four");
    });

    it("Handles many double-dotted relative urls", () => {
      go("../../four");
      expect(history.location.pathname).toEqual("/four");
    });
  });
});