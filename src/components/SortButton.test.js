import React from "react";
import SortButton from "./SortButton";

describe("Sort button", () => {
  it("should render ascending", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <SortButton
        className="sortButton"
        icon="<svg />"
        order="asc"
        onClick={onClick}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button span").text()).toEqual("Asc");
  });

  it("should render descending", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <SortButton
        className="sortButton"
        icon="<svg />"
        order="desc"
        onClick={onClick}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button span").text()).toEqual("Desc");
  });

  it("should invoke the click function when pressed", () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <SortButton
        className="sortButton"
        icon="<svg />"
        order="desc"
        onClick={onClick}
      />
    );

    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
