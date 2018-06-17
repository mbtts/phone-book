import { ERROR, LOADED, LOADING } from "../api/status";

import Detail from "./Detail";
import React from "react";
import { mockData } from "../api/__mocks__";

describe("Detail view component", () => {
  const contact = mockData[1];

  it("should render initial state", () => {
    const wrapper = shallow(<Detail status={LOADED} contact={contact} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should be loading initially", () => {
    const wrapper = shallow(<Detail status={ERROR} contact={null} />);
    expect(wrapper.find("p").text()).toEqual("Error");
  });

  it("should display an error if the detail cannot load", () => {
    const wrapper = shallow(<Detail status={LOADING} contact={null} />);
    expect(wrapper.find("p").text()).toEqual("Loading…");
  });
});
