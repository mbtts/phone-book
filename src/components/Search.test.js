import React from "react";
import Search from "./Search";

describe("Search component", () => {
  it("should render initial state", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Search disabled={true} onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should update state when text entered", () => {
    const onChange = jest.fn();
    const name = "name";

    const wrapper = shallow(<Search disabled={false} onChange={onChange} />);
    wrapper.find("input").simulate("change", {
      target: { name: "search", value: name }
    });
    expect(wrapper.state("search")).toEqual(name);
    expect(onChange).toHaveBeenCalledWith(name);
  });
});
