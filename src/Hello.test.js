import Hello from "./Hello";
import React from "react";
import { shallow } from "enzyme";

describe("Hello", () => {
  it("should render initial state", () => {
    const wrapper = shallow(<Hello />);
    expect(wrapper).toMatchSnapshot();
  });
});
