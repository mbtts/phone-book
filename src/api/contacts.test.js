import api, { sortByLastNameAsc, sortByLastNameDesc } from "./contacts";

describe("contacts api", () => {
  const names = [
    { name: "First Last" },
    { name: "Person A" },
    { name: "Person Z" }
  ];

  const verifyName = (response, expectedId, expectedName) => {
    expect(response.id).toEqual(expectedId);
    expect(response.name).toEqual(expectedName);
  };

  const verifyOrder = (sorted, expectedOrder) => {
    expect(sorted).toEqual(expectedOrder.map(name => ({ name })));
  };

  it("Fetches and indexes a list of contacts", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ contacts: names })
      })
    );

    const response = await api();

    expect(fetch).toHaveBeenCalledWith(
      "https://www.mocky.io/v2/581335f71000004204abaf83"
    );
    expect(response.length).toEqual(3);

    verifyName(response[0], 1, "Person A");
    verifyName(response[1], 0, "First Last");
    verifyName(response[2], 2, "Person Z");
  });

  it("Sorts list by last name (ascending)", () => {
    const sorted = [...names];
    sorted.sort(sortByLastNameAsc);
    verifyOrder(sorted, ["Person A", "First Last", "Person Z"]);
  });

  it("Sorts list by last name (descending)", () => {
    const sorted = [...names];
    sorted.sort(sortByLastNameDesc);
    verifyOrder(sorted, ["Person Z", "First Last", "Person A"]);
  });
});
