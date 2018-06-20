const createLastName = contact => {
  const lastName = contact.name.match(/\S+/g).pop();
  return lastName;
};

const sortByLastName = modifier => {
  return (a, b) =>
    createLastName(a).localeCompare(createLastName(b)) * modifier;
};

const sortByLastNameAsc = sortByLastName(1);
const sortByLastNameDesc = sortByLastName(-1);

export { sortByLastNameAsc, sortByLastNameDesc };
