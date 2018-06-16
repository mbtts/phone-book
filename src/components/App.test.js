import App from "./App";
import React from "react";
import { shallow } from "enzyme";

describe("Phone book", () => {
  it("should render initial state", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
