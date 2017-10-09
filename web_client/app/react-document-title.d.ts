import { Component } from 'react';

export as namespace DocumentTitle;
export = DocumentTitle;

declare class DocumentTitle extends Component<DocumentTitle.DocumentTitleProps, {}> { }

declare namespace DocumentTitle {
  interface DocumentTitleProps {
    title: string
  }
}