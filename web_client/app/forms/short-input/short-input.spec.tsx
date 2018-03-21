import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { ShortInput } from './short-input';
import { Labelled } from '../labelled/labelled';

describe("Labelled", () => {
  it("is labelled", () => {
    const label = "A label";
    const elt = <ShortInput label={label} onChange={() => {}} />;
    const rendered = mount(elt);
    expect(rendered.find(Labelled).length).toEqual(1);
    expect(rendered.text()).toEqual("A label");
  });

  it("contains an input", () => {
    const elt = <ShortInput label={""} onChange={() => {}} />;
    const rendered = shallow(elt);
    expect(rendered.find("input").length).toEqual(1);
  });

  it("Calls onChange when the input is changed", () => {
    const onChange = (value) => { expect(value).toBe("nice"); }
    const elt = <ShortInput label={""} onChange={onChange} />;
    const rendered = mount(elt);
    rendered.find("input").simulate('change', { target: { value: "nice" } })
  });

  it("Passes its type into the input", () => {
    const elt = <ShortInput label={""} onChange={() => {}} type="password" />;
    const rendered = mount(elt);
    expect(rendered.find("input[type='password']").length).toBe(1);
  });

  it("Calls onChange with a number when type=number", () => {
    const onChange = (value) => { expect(value).toBe(3); }
    const elt = <ShortInput label={""} onChange={onChange} type="number"/>;
    const rendered = mount(elt);
    rendered.find("input").simulate('change', { target: { value: "3" } })
  });
});
