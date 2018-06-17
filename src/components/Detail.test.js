import { ERROR, LOADED, LOADING } from "../api/status";

import Detail from "./Detail";
import React from "react";

const mockData = {
  id: 6,
  name: "Stanley Vanderhoof",
  phone_number: "+442032960000",
  address: "17 Anchor Ave, Darwen BB3 0AZ, UK"
};

describe("Detail view component", () => {
  it("should render initial state", () => {
    const wrapper = shallow(<Detail status={LOADED} contact={mockData} />);
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
