import { ERROR, LOADING } from "../api/status";

import ContactList from "./ContactList";
import React from "react";

describe("Phone book", () => {
  it("should be loading initially", () => {
    const wrapper = shallow(<ContactList status={LOADING} />);
    expect(wrapper.find("p").text()).toMatch("Loading…");
  });

  it("should display an error if the contacts cannot load", () => {
    const wrapper = mount(<ContactList status={ERROR} />);
    expect(wrapper.find("p").text()).toMatch("Error");
  });
});
