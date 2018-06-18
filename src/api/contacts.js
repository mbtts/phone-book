const api = async () => {
  const result = await fetch(
    "https://www.mocky.io/v2/581335f71000004204abaf83"
  );
  const json = await result.json();
  const indexed = json.contacts.map((contact, i) => ({ id: i, ...contact }));
  return indexed.sort(sortByLastNameAsc);
};

const createLastName = contact => {
  const lastName = contact.name.match(/\S+/g).pop();
  return lastName;
};

const sortByLastName = modifier => {
  return (a, b) => {
    return createLastName(a).localeCompare(createLastName(b)) * modifier;
  };
};

const sortByLastNameAsc = sortByLastName(1);
const sortByLastNameDesc = sortByLastName(-1);

export { api as default, sortByLastNameAsc, sortByLastNameDesc };
