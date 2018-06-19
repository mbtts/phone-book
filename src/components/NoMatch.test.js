import NoMatch from "./NoMatch";
import React from "react";

describe("No match component", () => {
  it("should render initial state", () => {
    const wrapper = shallow(<NoMatch />);
    expect(wrapper).toMatchSnapshot();
  });
});
