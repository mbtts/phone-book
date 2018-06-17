const api = async () => {
  const result = await fetch(
    "https://www.mocky.io/v2/581335f71000004204abaf83"
  );
  const json = await result.json();
  return json.contacts.map((contact, i) => ({ id: i, ...contact }));
};

export default api;
