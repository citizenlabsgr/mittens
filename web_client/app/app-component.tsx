// External CSS files
require('font-awesome/css/font-awesome.min.css');
require('styles/base.css');

import * as React from 'react';
import { routes } from 'routes';
import { Router } from 'router';
import { NotFound } from 'not-found/not-found';
import * as DocumentTitle from 'react-document-title';

// Components


export interface AppProps { };


export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <DocumentTitle title="Voter Engagement">
        <Router routes={routes} notFound={<NotFound />} />
      </DocumentTitle>
    );
  }
}
