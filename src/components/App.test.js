import App from "./App";
import { LOADING } from "../api/status";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import api from "../api/contacts";
import { mockData } from "../api/__mocks__/contacts";

jest.mock("../api/contacts");

describe("Phone book", () => {
  it("should render initial state", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(App).dive()).toMatchSnapshot();
  });

  it("should be loading initially", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      wrapper
        .find(App)
        .dive()
        .state("status")
    ).toEqual(LOADING);
  });

  it("should load the contacts successfully", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    return Promise.resolve().then(() => {
      wrapper.update();
      const p = wrapper.find("p");
      expect(p).toHaveLength(2);
      expect(p.first().text()).toMatch(mockData[0].name);
    });
  });

  it("should display an error if the contacts cannot load", () => {
    api.mockImplementationOnce(() => {
      throw new Error();
    });

    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find("p").text()).toMatch("Error");
    });
  });
});
