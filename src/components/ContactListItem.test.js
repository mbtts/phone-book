import ContactListItem from "./ContactListItem";
import { MemoryRouter } from "react-router-dom";
import React from "react";

const mockData = {
  id: 6,
  name: "Stanley Vanderhoof",
  phone_number: "+442032960000",
  address: "17 Anchor Ave, Darwen BB3 0AZ, UK"
};

describe("Contact list component", () => {
  it("should render initial state", () => {
    const wrapper = shallow(<ContactListItem contact={mockData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the contact name and link", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ContactListItem contact={mockData} />
      </MemoryRouter>
    );
    const link = wrapper
      .dive()
      .dive()
      .find("Link");

    expect(link.children().text()).toEqual(mockData.name);
    expect(link.prop("to")).toEqual(`/user/${mockData.id}`);
  });
});
