const api = async () => {
  const result = await fetch("http://www.mocky.io/v2/581335f71000004204abaf83");
  const json = await result.json();
  return json.contacts;
};

export default api;
