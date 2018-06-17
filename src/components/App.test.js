import App from "./App";
import { LOADING } from "../api/status";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import api from "../api";

jest.mock("../api");

const mockData = [
  {
    name: "Oleta Level",
    phone_number: "+442032960159",
    address: "10 London Wall, London EC2M 6SA, UK"
  }
];

describe("Phone book", () => {
  it("should render initial state", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should be loading initially", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.state("status")).toEqual(LOADING);
  });

  it("should load the contacts successfully", () => {
    api.mockReturnValueOnce(mockData);

    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    return Promise.resolve().then(() => {
      wrapper.update();
      const p = wrapper.find("p");
      expect(p).toHaveLength(1);
      expect(p.text()).toMatch(mockData[0].name);
    });
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
