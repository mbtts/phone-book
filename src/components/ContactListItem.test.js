import ContactListItem from "./ContactListItem";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mockData } from "../api/__mocks__";

describe("Contact list component", () => {
  const contact = mockData[1];

  it("should render initial state", () => {
    const wrapper = shallow(<ContactListItem contact={contact} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the contact name and link", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ContactListItem className="listItem" contact={contact} />
      </MemoryRouter>
    );
    const link = wrapper
      .dive()
      .dive()
      .find("Link");

    expect(link.children().text()).toEqual(contact.name);
    expect(link.prop("to")).toEqual(`/user/${contact.id}`);
  });
});
