import ContactMap from "./ContactMap";
import { Gmaps } from "react-gmaps";
import React from "react";

jest.mock("../api/geocode");

describe("Map of contact", () => {
  it("should render initial state", () => {
    const wrapper = shallow(
      <ContactMap contact={{ address: "17 Anchor Ave, Darwen BB3 0AZ, UK" }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a map with coordinates", async () => {
    const wrapper = shallow(
      <ContactMap contact={{ address: "17 Anchor Ave, Darwen BB3 0AZ, UK" }} />
    );

    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find(Gmaps)).toHaveLength(1);
      expect(wrapper.state("coords")).toEqual({
        lat: 53.6980027,
        lng: -2.476654
      });
    });
  });
});
