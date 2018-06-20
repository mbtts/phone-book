import { ERROR, LOADED, LOADING } from "../api/status";

import App from "./App";
import ContactList from "./ContactList";
import Detail from "./Detail";
import { MemoryRouter } from "react-router-dom";
import NoMatch from "./NoMatch";
import React from "react";
import Search from "./Search";
import SortButton from "./SortButton";
import api from "../api/contacts";
import { mockData } from "../api/__mocks__/contacts";

jest.mock("../api/contacts");

describe("Phone book", () => {
  describe("list view", () => {
    const shallowWrapper = () =>
      shallow(
        <MemoryRouter initialEntries={[{ pathname: "/", key: 1 }]}>
          <App />
        </MemoryRouter>
      )
        .find(App)
        .dive();

    const mountWrapper = () =>
      mount(
        <MemoryRouter initialEntries={[{ pathname: "/", key: 1 }]}>
          <App />
        </MemoryRouter>
      );

    it("should start loading", () => {
      const wrapper = shallowWrapper();
      expect(wrapper.state("status")).toBe(LOADING);
    });

    it("should load successfully", async () => {
      const wrapper = shallowWrapper();
      await flushPromises();

      expect(wrapper.state("status")).toBe(LOADED);
      expect(wrapper.state("items")._items).toEqual(mockData);
    });

    it("should error if loading fails", async () => {
      api.mockImplementationOnce(() => {
        throw new Error();
      });

      const wrapper = shallowWrapper();
      await flushPromises();

      expect(wrapper.state("status")).toBe(ERROR);
      expect(wrapper.state("items")).toBeUndefined();
    });

    it("should filter the results by name", async () => {
      let wrapper = mountWrapper();
      await flushPromises();

      wrapper
        .find(Search)
        .find("input")
        .simulate("change", { target: { value: "vander" } });

      const repository = wrapper.find(ContactList).prop("repository");
      expect(repository.selection.length).toEqual(1);
      expect(repository.selection[0]).toEqual(mockData[1]);
    });

    it("should display all results when the search is cleared", async () => {
      let wrapper = mountWrapper();
      await flushPromises();

      wrapper
        .find(Search)
        .find("input")
        .simulate("change", { target: { value: "vander" } });

      let repository = wrapper.find(ContactList).prop("repository");
      expect(repository.selection.length).toEqual(1);

      wrapper
        .find(Search)
        .find("button")
        .simulate("click");

      expect(wrapper.find(Search).prop("value")).toEqual("");

      repository = wrapper.find(ContactList).prop("repository");
      expect(repository.selection.length).toEqual(2);
    });

    it("should be possible to toggle the sort order", async () => {
      let wrapper = mountWrapper();
      await flushPromises();

      wrapper
        .find(SortButton)
        .find("button")
        .simulate("click");

      let order = wrapper.find(SortButton).prop("order");
      expect(order).toEqual("desc");

      let repository = wrapper.find(ContactList).prop("repository");
      expect(repository.selection.length).toEqual(2);
      expect(repository.selection[0]).toEqual(mockData[1]);
      expect(repository.selection[1]).toEqual(mockData[0]);

      wrapper
        .find(SortButton)
        .find("button")
        .simulate("click");

      order = wrapper.find(SortButton).prop("order");
      expect(order).toEqual("asc");

      repository = wrapper.find(ContactList).prop("repository");
      expect(repository.selection.length).toEqual(2);
      expect(repository.selection[0]).toEqual(mockData[0]);
      expect(repository.selection[1]).toEqual(mockData[1]);
    });
  });

  describe("detail view", () => {
    const shallowWrapper = () =>
      shallow(
        <MemoryRouter initialEntries={[{ pathname: "/user/6", key: 1 }]}>
          <App />
        </MemoryRouter>
      )
        .find(App)
        .dive();

    const mountWrapper = () =>
      mount(
        <MemoryRouter initialEntries={[{ pathname: "/user/10", key: 1 }]}>
          <App />
        </MemoryRouter>
      );

    it("should start loading", () => {
      const wrapper = shallowWrapper();
      expect(wrapper.state("status")).toBe(LOADING);
    });

    it("should resolve a single contact", async () => {
      const wrapper = shallowWrapper();
      await flushPromises();

      expect(wrapper.state("status")).toBe(LOADED);
      const contact = wrapper.instance().findItem({ params: { id: 6 } });
      expect(contact).toEqual(mockData[1]);
    });

    it("should display no match if an invalid is requested", async () => {
      const wrapper = mountWrapper();
      await flushPromises();

      expect(wrapper.contains(NoMatch)).toBeTruthy();
      expect(wrapper.find(Detail).prop("contact")).toBeNull();
    });
  });
});
