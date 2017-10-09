import * as React from 'react';

// CSS
import { vars, css } from 'styles/css';

// Makes a screenreader-only alert-box to read off errors from an api model
// update.
export function ErrorReader(errors: { [id: string]: string[] }, otherErrors?: string[]) {
  return <div {...css(vars.screenreaderOnly) } role="alert">
    {Object.keys(errors).map((name, i) => <div key={i}>
      {errors[name].map((err, i) => <p key={i}>{name} {err}</p>)}
    </div>)}
    {otherErrors && otherErrors.map((err, i) => <p key={i}>{err}</p>)}
  </div>;
}
