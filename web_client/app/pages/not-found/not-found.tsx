import * as React from 'react';

import { Link } from 'components/link/link';

// CSS
import { styles, vars, css } from 'styles/css';


export interface NotFoundProps {

};


export class NotFound extends React.Component<NotFoundProps, {}> {
  render() {
    return (

      <div {...style.centeredBox}>
        <div>
          <p{...style.quote}><em>
            &ldquo;How often I found where I should be going only by setting out for somewhere else.&rdquo;
          </em></p>

          <p{...style.attribution}>&mdash; R. Buckminster Fuller</p>
        </div>

        <p>Sorry, that page does not exist. <Link replace to="/">Return home</Link>.</p>
      </div>
    );
  }
}

let style = styles({
  quote: {
    fontSize: 30,
    fontFamily: "Times New Roman",
    color: vars.color.fontLight
  },
  attribution: {
    fontSize: 18,
    fontFamily: "Times New Roman",
    color: vars.color.fontLight,
    textAlign: 'right'
  },
  centeredBox: {
    position: 'relative',
    margin: `${vars.spacing}px auto`,
    maxWidth: 900,
    backgroundColor: vars.color.white,
    ...vars.border,
    padding: 25,
    ...vars.clearFix,
    '@media(min-width: 716px)': {
      padding: '35px 75px 50px 75px',
    }
  }
});