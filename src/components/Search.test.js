import React from "react";
import Search from "./Search";

describe("Search component", () => {
  const onChange = jest.fn();
  const onClear = jest.fn();

  beforeEach = () => {
    onChange.mockClear();
    onClear.mockClear();
  };

  it("should render initial state", () => {
    const wrapper = shallow(
      <Search
        className="search"
        clearClassName="clearsearch"
        value=""
        disabled={true}
        onChange={onChange}
        onClearClick={onClear}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke the change function when text entered", () => {
    const name = "name";

    const wrapper = shallow(
      <Search
        className="search"
        clearClassName="clearsearch"
        value=""
        disabled={false}
        onChange={onChange}
        onClearClick={onClear}
      />
    );

    const event = {
      target: { name: "search", value: name }
    };
    wrapper.find("input").simulate("change", event);
    expect(onChange).toHaveBeenCalledWith(event);
  });

  it("should invoke the clear function when clear clicked", () => {
    const wrapper = shallow(
      <Search
        className="search"
        clearClassName="clearsearch"
        value=""
        disabled={false}
        onChange={onChange}
        onClearClick={onClear}
      />
    );
    wrapper.find("button").simulate("click");
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
