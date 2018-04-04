import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { vars } from 'styles/css';

import { Labelled } from './labelled';

describe("Labelled", () => {
  it("Displays a label", () => {
    const label = "A label";
    const elt = <Labelled label={label} />;
    const rendered = mount(elt);
    expect(rendered.text()).toBe(label);
  });

  it("Displays an error when available", () => {
    const label = "A label";
    const errors = ["Error message"]
    const elt = <Labelled label={label} errors={errors} />;
    const rendered = mount(elt);
    expect(rendered.text()).toBe(label + errors[0]);
  });

  it("Displays multiple errors when available", () => {
    const label = "A label";
    const errors = ["Error message", "Another message"]
    const elt = <Labelled label={label} errors={errors} />;
    const rendered = mount(elt);
    expect(rendered.text()).toBe(label + errors.join('; '));
  });

  it("Displays a note when present and there are no errors", () => {
    const label = "A label";
    const note = "A note";
    const elt = <Labelled label={label} note={note} />;
    const rendered = mount(elt);
    expect(rendered.text()).toBe(label + note);
  });

  it("Displays errors in place of the note if errors are present", () => {
    const label = "A label";
    const note = "A note";
    const errors = ["Error message"]
    const elt = <Labelled label={label} note={note} errors={errors} />;
    const rendered = mount(elt);
    expect(rendered.text()).toBe(label + errors[0]);
  });

  it("Displays its children", () => {
    var foo = 1;
    const elt = <Labelled label=""><div>Hello</div></Labelled>;
    const rendered = mount(elt);
    expect(rendered.contains(<div>Hello</div>)).toBe(true);
  });
});
