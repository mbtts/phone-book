import React from "react";
import Search from "./Search";

describe("Search component", () => {
  it("should render initial state", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Search value="" disabled={true} onChange={onChange} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke the change function when text entered", () => {
    const onChange = jest.fn();
    const name = "name";

    const wrapper = shallow(
      <Search value="" disabled={false} onChange={onChange} />
    );

    const event = {
      target: { name: "search", value: name }
    };
    wrapper.find("input").simulate("change", event);
    expect(onChange).toHaveBeenCalledWith(event);
  });
});
