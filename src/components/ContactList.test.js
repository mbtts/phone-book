import ContactList from "./ContactList";
import { LOADING } from "../api/status";
import React from "react";

describe("Phone book", () => {
  it("should be loading initially", () => {
    const wrapper = shallow(<ContactList status={LOADING} />);
    expect(wrapper.find("p").text()).toMatch("Loading…");
  });

  it("should display an error if the contacts cannot load", () => {
    api.mockImplementationOnce(() => {
      throw new Error();
    });

    const wrapper = mount(<App />);
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find("p").text()).toMatch("Error");
    });
  });
});
